var pathLib = require('path'),
util = require('utility.js'),
express=require('express');
var packageJSON,config,initJS;
exports.createCore=function(conf,pack,iniJS){
    packageJSON=pack;
    config=conf;
    initJS=iniJS;
    if(typeof packageJSON['useCPUCore'] !=='undefined' &&
      packageJSON['useCPUCore'] !=false){
        cluster = require('cluster');
        os=require('os');
        var numCPUs = os.cpus().length;
        var num=parseInt(packageJSON['useCPUCore']);
        if(typeof packageJSON['useCPUCore']==='boolean' && packageJSON['useCPUCore']==true){num=numCPUs}
        else if(typeof packageJSON['useCPUCore']==='boolean' && packageJSON['useCPUCore']==false){return express();}
        if(isNaN(num)){return express()}else{
            if(num>numCPUs){num=numCPUs}
            else if(num==0){num=1}
        }
        if (cluster.isMaster){
            try{
                for (var i = 0; i < num; i++) {
                   var worker = cluster.fork();
                }
                return;
            }catch(e){
                throw new Error("Error while apply core");
            }
            cluster.on('exit', function(worker, code, signal) {
                console.log('worker ' + worker.process.pid + ' died');
                var worker = cluster.fork();
            });
            cluster.on('fork', function(worker) {console.log('worker ' + worker.process.pid + ' started')});
        }else{
           return  express();
        }
    }else{
        return express();
    }
}