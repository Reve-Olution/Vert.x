var vertx = require('vertx');
var console = require('vertx/console');

var server = vertx.createHttpServer();

server.requestHandler(function (request){

	console.log(request.path());
	showHeaders(request);
	request.response.end('<h1>Hello Globaz...</h1>');
	
		
});

server.listen(9090,'localhost');


var showHeaders = function(request) {
	
	request.headers().forEach(function (cle,valeur) {
		console.log(cle + ':' + valeur);
	})

}


