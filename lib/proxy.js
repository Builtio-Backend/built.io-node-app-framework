var pathLib = require('path'),
    util = require('utility.js');
exports.createProxy = function (expApp, config) {
    var proxyFileJSON = pathLib.join(config.configPath, 'proxy.json');
    if (util.isFileSync(proxyFileJSON)) {
        var proxiesJSON = util.readSync(proxyFileJSON);
        try { proxiesJSON = JSON.parse(proxiesJSON) } catch (e) { throw new Error(e) };
        if (typeof proxiesJSON == 'object') {
            var httpProxy = require('http-proxy');
            for (var i = 0; i < proxiesJSON.length; i++) {
                if (typeof proxiesJSON[i] == 'object' && proxiesJSON[i].route && proxiesJSON[i].host && proxiesJSON[i].port) {
                    if (proxiesJSON[i].route.charAt(0) != '/') { proxiesJSON[i].route = '/' + proxiesJSON[i].route }
                    var events={}
                    events.onStart=function (req, res, next) { next() };
                    if (typeof proxiesJSON[i].before=='string') {
                        events.onStart= util.getMethod(pathLib.join(config.controllerPath, proxiesJSON[i].before), true);
                    }
                    events.onEnd=function (req, res, next) { };
                    if (typeof proxiesJSON[i].after=='string') {
                        events.onEnd = util.getMethod(pathLib.join(config.controllerPath, proxiesJSON[i].after), true);
                    }
                    events.onError=function (req, res, next) { };
                    if (typeof proxiesJSON[i].error=='string') {
                        events.onError = util.getMethod(pathLib.join(config.controllerPath, proxiesJSON[i].error), true);
                    }
                    proxy = new httpProxy.RoutingProxy();
                    proxy.on('end',function(reqs,resp,response){
                        events.onEnd(reqs,resp,response);
                    });
                    proxy.on('proxyError',function(reqs,resp,response){
                        events.onError(reqs,resp,response);
                    });
                    var handler = (function (cProx, proxy,evt) {
                        return function (req, res, next) {
                            var buffer = httpProxy.buffer(req);
                            var startProxy = function () {
                                if(cProx.path)cProx.path=cProx.path.toString();
                                if(typeof cProx.path=='string' && cProx.path.length>0){
                                    var ur=util.urlify(cProx.path);
                                    if(ur.charAt(0) !='/'){ur='/'+ur}
                                    req.url=ur+req.url;
                                }
                                var option={
                                    host: cProx.host,
                                    port: cProx.port,
                                    buffer: buffer,
                                    enable: {
                                        xforward: true
                                    },
                                    changeOrigin: true ,
                                    timeout: 60000
                                }
                                if(cProx.port == "443") {
                                    option.target={https:true}
                                }
                                if(cProx.cert &&
                                    typeof cProx.cert=='object' &&
                                    cProx.cert.key &&
                                    cProx.cert.cert){
                                    option.https ={
                                        key:fs.readFileSync(cProx.key, 'utf8'),
                                        cert:fs.readFileSync(cProx.cert, 'utf8')
                                    }
                                }
                                proxy.proxyRequest(req, res,option );
                            }
                            evt.onStart(req, res, startProxy);
                        }
                    })(proxiesJSON[i], proxy,events);
                    expApp.use(proxiesJSON[i].route,handler);
                } else {
                    console.log(proxiesJSON[i], 'is not valid proxy config');
                }
            }
        }
    }

}