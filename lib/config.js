var pathLib = require('path'),
util = require('utility.js');

exports.createConfig=function(config,packageJSON){
    var envr=(typeof packageJSON != 'object' ||
            typeof packageJSON.environment==='undefined' ||
            packageJSON.environment ==""?"development":packageJSON.environment);
    var configPath=pathLib.join(config.configPath,'environment',envr+'.json');
    var __c={};
    if (util.isFileSync(configPath)){
        var data = util.readSync(configPath);
        try { data = JSON.parse(data) } catch (e) {throw envir +".json configuration is not valid JSON"};
        if(typeof data !='object'){data={}}
        __c=data;
    }
    return _Config={
        __c:data,
        config:function(key){
            if(typeof key=='string'){
                /*if(val!=''){
                    this.__c[key]=val;
                    return true;
                }else{
                    if(this.__c[key]){
                        try{delete this.__c[key]}catch(e){}
                    }
                }
            }else if(key){  */
                return this.__c[key];
            }
            return this.__c;
        },
        view:function(file){
            return pathLib.join(config.viewPath,(file?file:""));
        } ,
        template:function(file){
            return pathLib.join(config.viewPath,(file?file:""));
        } ,
        public:function(file){
            return pathLib.join(config.publicPath,(file?file:""));
        },
        controller:function(file){
            return pathLib.join(config.controllerPath,(file?file:""));
        },
        dump:function(){
            return pathLib.join(config.dumpPath,(file?file:""));
        },
        path:config.appPath,
        log:(envr=='development'?
            function(){console.log.apply(console,arguments);console.log(__filename)}:
            function(){} ),
        name:packageJSON.name.replace(/[ \t\r\n]+/g,"")
    };
}