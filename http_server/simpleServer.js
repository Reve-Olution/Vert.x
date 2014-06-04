var vertx = require('vertx');
var console = require('vertx/console');

var server = vertx.createHttpServer();

server.requestHandler(function (request){

	
	request.response.end('<h1>Hello Globaz...</h1>');
	
		
}).listen(9090,'localhost',function () {
	console.log('Server start listenning');	
});

//server.listen(9090,'localhost');





