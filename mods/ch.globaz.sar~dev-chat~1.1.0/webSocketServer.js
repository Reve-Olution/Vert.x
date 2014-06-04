var vertx = require('vertx');
var http = require('vertx/http');
var console = require('vertx/console')
var container = require('vertx/container');

//récupération de la configuration passé au verticle --> port

var users = [];

var routeMatcher = new http.RouteMatcher();

var server = vertx.createHttpServer();


server.requestHandler(function (req) {
	
	var path = req.path();
	console.log(req.path());
	if(path === '/chat' || path === '/'){
		req.response.sendFile("web/ws.html")
	}else if(path.substring(0,3) === '/js' || path.substring(0, 4) === '/css'){
		console.log(req.path());
		req.response.sendFile('web'+req.path());
	}else{
		req.response.sendFile("web/error404.html");
	}
	
});

vertx.eventBus.registerHandler('user/login', function (message,replier) {
	console.log('beforeLogin');
	replier({'status':200});
	users.push(message.userName);
	console.log('beforeBus:');
	console.log(message);
	vertx.eventBus.publish("user/logged",{'status':200,'username':message.userName,'message':message});
	console.log('afterLogin');
});

vertx.eventBus.registerHandler('message/post', function (message) {
	
	//message.add(message.body());
	vertx.eventBus.publish("message/posted", message);
	
});


vertx.createSockJSServer(server).bridge({prefix: "/eventbus"},[{}],[{}]);
server.listen(9090);


