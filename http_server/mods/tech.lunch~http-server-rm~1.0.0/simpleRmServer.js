var vertx = require('vertx');
var console = require('vertx/console');
var http = require('vertx/http');

var server = vertx.createHttpServer();

var routeMatcher = new http.RouteMatcher();

var response = '<h1>Hello Globaz...RouteMatcher test</h1><br/>';

server.requestHandler(routeMatcher);

routeMatcher.get('/info',function (request) {
	request.response.end(response.concat(showRequestInfo(request)));
});

routeMatcher.get('.*',function (request) {
	request.response.end(response);
});


server.listen(9090,'localhost',function () {
	console.log('Server started listenning port 9090, host: localhost')
});


var showRequestInfo = function(request) {
	
	var responsePart = '';
	
	request.headers().forEach(function (cle,valeur) {
		responsePart = responsePart.concat(cle,':',valeur,'<br/>');
	});
	
	responsePart = responsePart.concat('<br/>');
	
	request.params().forEach(function (cle,valeur) {
		responsePart = responsePart.concat(cle,':',valeur,'<br/>');
	});
	
	return responsePart;

}


