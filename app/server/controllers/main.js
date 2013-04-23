
var utils=require('utility');
var Built=require('built');
exports.NEW = function(req,res){
    res.send('New called');
};
exports.INDEX = function (req, res) {
    console.log(App.instance.get('env'));
    console.log(App.config());
    res.send('hello');
};
exports.CREATE = function(req,res){
    console.log(App.config());
    res.send('create called');
}
exports.DESTROY = function(req,res){
    res.send('destroy called');
}
exports.SHOW = function(req,res,next){
    res.send('show called with ' + req.params.id);
}
exports.EDIT = function(req,res,next){
    res.send('edit called');
}

exports.before=function(req,res,next){
    console.log('started' );
    if(typeof next=='function')next();
}

exports.after=function(req,res,next){
    console.log('done');
}

exports.error=function(req,res,next){
    console.log('error');
}