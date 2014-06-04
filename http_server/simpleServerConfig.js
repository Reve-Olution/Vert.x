var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');

var server = vertx.createHttpServer();





var config = {"port":9898,"host":"localhost"};


var port = config['port'];
var host = config['host'];

if(port === undefined){
	port = 9090;
}
if(host === undefined){
	host = 'localhost';
}

server.requestHandler(function (request){

	
	request.response.end('<h1>Hello Globaz...</h1>');
	
		
}).listen(port,host,function () {
	console.log('Server start listenning ['+ host + ':' + port + ']');	
});

//server.listen(9090,'localhost');





