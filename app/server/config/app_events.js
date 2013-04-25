var Events={
	init:function(app){
		//Eg: console.log('This code block will be invoked at the start of the application');
	},
	notFound:function(req, res){
		//Eg: res.send(404,'No Path');
	},
	forbidden:function(req,res){
		//Eg: res.send(403,'Forbidden');
	},
	development:function(app){
		//Eg: console.log('This code block will be invoked in development mode. This application will be invoked at the start of application only ');
	},
	production:function(app){
		//Eg: console.log('This code block will be invoked in production mode. This application will be invoked at the start of application only');
	},
	error:function(err){
		//Eg: console.log('This code block will be invoked when any uncought error occurs');
	}
}
module.exports=Events;