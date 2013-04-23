var pathLib = require('path');
var util = require('utility.js');
var packageJSON={};
var initJS=null;
var forbid="";
var envr="development";

module.exports= new function(){
    this.hostCheck= function (req,res,next) {
        //res.setHeader('X-Powered-By', "Raw-App-FrameWork");
        try{
            if(packageJSON.host=='*' || packageJSON.host[envr]=='*'){
                next();
                return this;
            }
        }catch(e){}
        if(packageJSON.host){
            if(typeof packageJSON.host=='string' && req.host!=packageJSON.host){
                forbidden(req,res,next);
                return this;
            }else if(typeof packageJSON.host=='object' && packageJSON.host[envr]){
                if(req.host!=packageJSON.host[envr]){
                    forbidden(req,res,next);
                    return this;
                }
            }
        }
        next();
        return this;
    }
    this.init=function(packJS,iniJS,config){
        packageJSON=packJS;
        initJS=iniJS;
        forbid=util.isFileSync(pathLib.join(config.configPath,'forbidden.html'));
        if(packJS['environment']){envr=packJS['environment']}
        return this;
    }


}
var forbidden=function(req,res,next){
    if(typeof initJS.forbidden=='function'){
        initJS.forbidden(req,res,next);
    }else if(forbid){
        res.redirect(forbid);
    }else{
        res.send(403,'Forbidden');
    }
}