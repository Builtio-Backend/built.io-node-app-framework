var ON={
	init:function(app){
		//console.log(app.get("env"));
		//App.instance.get("env");
	},
	notFound:function(req,res){
		console.log('wrong-turn-man');
		res.send(404,'no path');
	},
	forbidden:function(req,res){
		console.log('no-access');
		res.send(403,'forbidden');
	},
	development:function(app){
		//console.log('running on dev mode');
	},
	production:function(app){
		//console.log('running on prod mode');
	},
	error:function(err){
		//console.log('app face uncought error');
	}
}

module.exports=ON;