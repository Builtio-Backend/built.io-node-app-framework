var pathLib=require('path');
var util = require('utility.js');
var packageJSON,initJS;
exports.evalPackageJSON=function(config){
    if ( util.isFileSync(pathLib.join(config.serverPath,config.packageFile))) {
        require('./prototyping.js').addProto();
        packageJSON=util.readSync(pathLib.join(config.serverPath,config.packageFile))  ;
        try{packageJSON=JSON.parse(packageJSON)}catch(e){throw new Error("Invalid package.json")}
        if(typeof packageJSON['name']==='undefined'){throw new Error("Application name required in package.json")}
        if(typeof packageJSON['version']==='undefined'){throw new Error("Application version required in package.json")}
        if (util.isFileSync(config.initJS)) {
            try {initJS = require(config.initJS)}
            catch (e) {initJS={}; throw new Error("Invalid File " + config.initJS)}
        }else{initJS={}}
        return {packageJSON :packageJSON,initJS:initJS}
    }else{
        throw new Error( "package.json required in app directory");
    }
}