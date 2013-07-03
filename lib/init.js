var pathLib=require('path');
var util = require('utility.js');
var Built=GLOBAL.Built=require('built');
var config=JSON.parse(process.env.configs),
    packageJSON,initJS;      //app_events.js is init js
var data=require('./package.js').evalPackageJSON(config);
if(data.packageJSON && data.packageJSON.name){
    packageJSON=data.packageJSON;
    initJS=data.initJS;
    GLOBAL.App={};
    App=require('./config.js').createConfig(config,packageJSON);
    var app=require('./core.js').createCore(config,packageJSON,initJS);
    if(typeof app !=='undefined'){
        require('./setup.js').setupApp(app,config,packageJSON,initJS);
        App.env=app.get('env');
        App.instance=app;
    }
}else{throw new Error("package.json is not valid")}