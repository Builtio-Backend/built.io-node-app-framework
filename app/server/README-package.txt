{
    "name" : "demo",                     //Name of the app (required)
    "description" : "This is demo app",  // description of the app (optional)
    "version":"1.0.0",                   //Version of the app (required)
    "environment":"development",         //Environment of the application (optional) default:development
    "dependencies": {},                  //Third party module required for application (optional)
    /* UseCPUCore
       This attribute help to deploy app in multi-core environment.
       false: will run the app in single core.
       true: will run the app in all the CPU core's available. (optional)
       {Number}: will run the app in number of CPU core's provided by the user. (optional)
    */
    "useCPUCore":false,
    "gzip":true,                         //It will enable the Gzip support for the application. (optional)
    "session":false,                     //It will enable the session support for the application. (optional)
    "bodyParser":true,                   //It will parse all request data and make it available in request object as req.body  (optional)
    "userLog":true,                      //Turn user log on/off (optional)
    "port":"4000"                        //Port number on which application should run (required)
    "foreverMonitor": false              //Whether to run server in forever or not. To debug an application, please make sure to turn forever monitor off
    "https":{
	"key":"absolute path to private key", 
	"cert":"absolute path to certificate"
    }					//For enabling https in site (optional)
}


