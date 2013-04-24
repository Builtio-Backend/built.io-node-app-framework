exports.before=function(req, res, next){
    console.log('started' );
    if(typeof next=='function')next();
}

exports.after=function(req, res, next){
    console.log('done');
}

exports.error=function(req, res, next){
    console.log('error');
}