var express=require('express');
var util = require('utility.js');
var pathLib = require('path');
var ejs=require('ejs');
var dport=3000;
var https = require('https');
var packageJSON,initJS,isNotFoundFile,config;

exports.setupApp=function(expApp,conf,pack,iniJS){
    packageJSON=pack;
    initJS=iniJS;
    config=conf;
    initialAppConfig(expApp);
    applyHostCheck(expApp);
    createProxy(expApp);
    configureApp(expApp);
    createRoute(expApp)
    createResource(expApp)
    notFoundCheck(expApp);
    appRun(expApp);
}

var applyHostCheck=function(expApp){
    if(typeof packageJSON['host'] !=='undefined' &&
        packageJSON['host']!= "*" &&
        packageJSON['host'][packageJSON['environment']] !="*"){
        var hostChk=require('./hostCheck.js').init(packageJSON,initJS,config);
        expApp.use(hostChk.hostCheck);
    }
}

var createProxy=function(expApp){
    require('./proxy.js').createProxy(expApp,config);
}

var createRoute=function(expApp){
    require('./route.js').createRoute(expApp,config);
}

var createResource=function(expApp){
    require('./resource.js').createResource(expApp,config);
}

var configureApp=function(expApp){
    isNotFoundFile=util.isFileSync(pathLib.join(config.publicPath,'404.html'));
    if(packageJSON['methodOverride'] == true || typeof packageJSON['methodOverride']==='undefined'){
        expApp.use(express.methodOverride());
    }
    if(packageJSON['bodyParser']==true || typeof packageJSON['bodyParser'] ==='undefined'){
        expApp.use(express.bodyParser({ keepExtensions: true, uploadDir:config.filePath}));
    }
    if(packageJSON['session']==true){
        expApp.use(express.cookieParser());
        //expApp.use(express.cookieSession());
        expApp.use(express.session(
            {secret: 'idontknowwhattoputhere',
             key: 'sid',
             cookie: { secure: true,maxAge: 864000000 }
            }
        ));
    }
    if(packageJSON['gzip'] == true || typeof packageJSON['gzip']==='undefined'){
        expApp.use(express.staticCache()) ;
        expApp.use(express.compress());
        expApp.use(express.static(config.publicPath)) ;
    }
    if(util.isFileSync(pathLib.join(config.publicPath, 'favicon.ico'))){
        expApp.use(express.favicon(
            pathLib.join(config.publicPath, 'favicon.ico')
        ));
    }
    if (typeof initJS.init == 'function') {initJS.init(expApp, packageJSON)}

    if (expApp.get('env') == 'development') {
        expApp.use(express.logger(':method --> :url --> :status'));
    }
    if(typeof initJS.production=='function' && expApp.get('env')=='production'){initJS.production(expApp,packageJSON);
    }else if(typeof initJS.development=='function'){initJS.development(expApp,packageJSON)}

    if(typeof initJS.error=='function'){
        process.on('uncaughtException', function(err) {initJS.error(err)});
    }else{
        if(expApp.get('env')=='production'){
            process.on('uncaughtException', function(err) {
                console.log("uncaught Error");
                console.log(err.stack,err,err.message);
            });
        }
    }
}
var notFoundCheck=function(expApp){
    expApp.all('*', function (req, res, next) {
        if (typeof initJS.notFound == 'function') {
            initJS.notFound(req, res, next);
        } else if(isNotFoundFile){
            res.redirect('/404.html');
        }else{ res.send(404,'Required resource not found, click <a href="/">here</a> to goto HomePage'); }
    });
}


var appRun=function(app){
    if(packageJSON['https'] && packageJSON['https']['cert'] && packageJSON['https']['key'] ){
        if(util.isFileSync(packageJSON['https']['cert'])==false ||
            util.isFileSync(packageJSON['https']['key'])==false) {
            throw new Error("Invalid certificate path");
            return;
        }
        var privateKey = util.readSync(packageJSON['https']['key']);
        var certificate = util.readSync(packageJSON['https']['cert']);
        https.createServer({key:privateKey,cert:certificate}, app).listen(app.get('port'),
            function(){
                console.log("RAW Node Application Framework Started On Port:" ,
                    app.get('port').toString().red()
                )
            });
    }else{
        app.listen(
            app.get('port'),
            function(){
                console.log("RAW Node Application Framework Started On Port:" ,
                    app.get('port').toString().red()
                )
            }
        );
    }

}

var initialAppConfig=function(app){
    if(packageJSON['port'] && isNaN(packageJSON.port)==false){dport=parseInt(packageJSON.port)}
    app.set('port', process.env.PORT ||dport);
    app.set('views', config.viewPath);
    app.engine('html', ejs.renderFile);
    app.engine('ejs', ejs.renderFile);
    app.set('view engine', 'jade');
    /*--------------------------------------------------------------------------------------------------*/
    /*app.use(function(req, res, next) {
        if (toobusy()) {res.send(503, "server is too busy right now, try again later.")}else { next()}
     });*/

    if (packageJSON['basicAuth'] && packageJSON['basicAuth']['user'] && packageJSON['basicAuth']['pass']) {
        var cred = packageJSON['basicAuth'];
        app.use(express.basicAuth(function (user, pass) { return cred.user == user & cred.pass == pass }));
    }
    var env = packageJSON['environment'];
    if (typeof env !=='undefined' && (env == "development" || env == "production")) {app.set("env", env)}
    else{app.set("env", "development")}
}