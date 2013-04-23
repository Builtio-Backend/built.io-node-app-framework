var forever = require('forever-monitor');
var pathLib=require('path');
var utils=require('utility');
var lConfig= config={
    packageFile:'package.json',
    verbs: ['get', 'post', 'delete', 'put', 'all','head'],
    resourceMethod: { post: 'CREATE', get: 'INDEX', put: 'UPDATE', 'delete': 'DESTROY' },
    extraResourcePath:{'/new':'NEW','/:id/edit':'EDIT','/:id':'SHOW'} ,
    appPath:pathLib.join(__dirname,'app'),
    clientPath:pathLib.join(__dirname,'app','client'),
    publicPath:pathLib.join(__dirname,'app','client'),
    serverPath:pathLib.join(__dirname,'app','server'),
    controllerPath:pathLib.join(__dirname,'app','server','controllers'),
    filePath:pathLib.join(__dirname,'app','server','files'),
    viewPath:pathLib.join(__dirname,'app','server','templates') ,
    templatePath:pathLib.join(__dirname,'app','server','templates') ,
    localNodeModule:pathLib.join(__dirname,'app','server','node_modules'),
    globalNodeModule:pathLib.join(__dirname,'node_modules'),
    configPath:pathLib.join(__dirname,'app','server','config') ,
    logPath:pathLib.join(__dirname,'log'),
    initJS:pathLib.join(__dirname,'app','server','config','app_events.js')
}
config=JSON.stringify(config);
var month=new Date().getMonth()+ 1,
    year= new Date().getFullYear(),
    day= new Date().getDate(),
    stamp=day+'-'+month+'-'+year;

if ( utils.isFileSync(pathLib.join(lConfig.serverPath,lConfig.packageFile))) {
    packageJSON=utils.readSync(pathLib.join(lConfig.serverPath,lConfig.packageFile))  ;
    try{packageJSON=JSON.parse(packageJSON)}catch(e){
        throw new Error("Invalid package.json");
        process.exit(-1);
    }
    if(typeof packageJSON['name']==='undefined'){
        throw new Error("Application name required in package.json");
        process.exit(-1);
    }
    if(typeof packageJSON['version']==='undefined'){
        throw new Error("Application version required in package.json");
        process.exit(-1);
    }
    var option={
        max: 3,
        silent: false ,
        cwd:__dirname ,
        append:true,
        env: {'configs':config}
    }
    if(packageJSON['userLog']==true){
        option.outFile=pathLib.join(lConfig.logPath,'user_log-'+stamp+'.LOG');
    }
    if(typeof packageJSON['errorLog']==="undefined" || packageJSON['errorLog']==true){
        option.errFile=pathLib.join(lConfig.logPath,'error_log-'+stamp +'.LOG');
    }
    var child = new (forever.Monitor)(pathLib.join(__dirname,'lib','init.js'),option );
    child.on('exit', function (e) {
        console.log('daemon has exited after 3 restarts',e);
    });
    child.on('error', function (e) {
        console.log('daemon error, server cannot be up ',e);
    });
    child.start();

}else{
    throw new Error( "package.json required in app directory");
    process.exit(-1);
}