var pathLib = require('path'),
    util = require('utility.js');
exports.createRoute=function(expApp,config){
    var routeFileJSON = pathLib.join(config.configPath,'route.json');
    if (util.isFileSync(routeFileJSON)){
        var routesJSON = util.readSync(routeFileJSON);
        try { routesJSON = JSON.parse(routesJSON) } catch (e) {errHandler(e)};
        if (typeof routesJSON == 'object') {
            for (var i in routesJSON) {
                for (var j = 0; j < config.verbs.length; j++) {
                    if (i == config.verbs[j]) {
                        for (var k = 0; k < routesJSON[i].length; k++) {
                            var appRoute = util.urlify('/' + routesJSON[i][k][0]) ,
                                appRoute = appRoute.substring(appRoute.indexOf('/'), appRoute.length),
                                methodPath = pathLib.join(config.controllerPath , routesJSON[i][k][1]);
                            if (appRoute == '//' ||
                                appRoute == '///' ||
                                appRoute == '/' ||
                                appRoute == '\\' ||
                                appRoute == "") { appRoute = "/" }
                            var method = util.getMethod(methodPath);
                            try { expApp[i](appRoute, method) } catch (e) { throw "error while routing"}
                        }
                    }
                }
            }
        }
    }
}
