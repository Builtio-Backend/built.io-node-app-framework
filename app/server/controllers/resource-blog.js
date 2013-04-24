var Built=require('built');

exports.NEW = function(req, res){
	// Eg: console.log('will be called when /blog/new GET request is made')
    res.send('New called');
};
exports.INDEX = function (req, res) {
    // Eg: console.log('will be called when /blog GET request is made')
    res.send('hello');
};
exports.CREATE = function(req, res){
    // Eg: console.log('will be called when /blog POST request is made')
    res.send('create called');
}
exports.DESTROY = function(req, res){
	// Eg: console.log('will be called when /blog DELETE request is made')
    res.send('destroy called');
}
exports.SHOW = function(req, res, next){
	// Eg: console.log('will be called when /blog/:id GET request is made')
    res.send('show called with ' + req.params.id);
}
exports.EDIT = function(req, res, next){
	// Eg: console.log('will be called when /blog/:id/edit GET request is made')
    res.send('edit called');
}
exports.UPDATE = function(req, res, next){
	// Eg: console.log('will be called when /blog/:id PUT request is made')
    res.send('edit called');
}