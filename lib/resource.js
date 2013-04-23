var pathLib = require('path'),
    util = require('utility.js');
exports.createResource = function (expApp,config) {
    var resourceFileJSON = pathLib.join(config.configPath,'route.json');
    if (util.isFileSync(resourceFileJSON)){
        var resourceJSON = util.readSync(resourceFileJSON);
        try { resourceJSON = JSON.parse(resourceJSON) } catch (e) {throw "error while parsing route.json"};
        if (typeof resourceJSON == 'object' &&
            typeof resourceJSON.resource =='object' &&
            util.isArray(resourceJSON.resource) &&
            resourceJSON.resource.length > 0) {
            for (var i = 0; i < resourceJSON.resource.length; i++) {
                var curItem=resourceJSON.resource[i];
                var methodPath = pathLib.join(config.controllerPath , curItem[1]) + '.',
                routePath;
                if (curItem[0] == '' || curItem[0] == '/' || curItem[0] == "\\") {routePath = '/'}
                else{routePath = util.urlify(curItem[0])}
                if (routePath.charAt(0) != '/') { routePath = '/' + routePath }
                for (var k in config.resourceMethod) {
                    var resMeth = config.resourceMethod[k],
                    method = util.getMethod(methodPath + resMeth);
                    if (k == 'put' || k == 'delete') {
                        var urls = util.urlify(routePath + '/:id');
                        try { expApp[k](urls, method)}
                        catch (e) {throw new Error(e)}
                    } else {
                        try {
                            expApp[k](routePath, method);
                        } catch (e) {throw new Error(e)}
                    }
                }
                // extra resource routing [new , edit]
                for (var item in config.extraResourcePath) {
                    var ex_method = util.getMethod(methodPath + config.extraResourcePath[item]);
                    try { expApp.get(util.urlify(routePath + '/' + item), ex_method) }
                    catch (e) {throw "error while resourcing"}
                }
            }
        }
    }
}