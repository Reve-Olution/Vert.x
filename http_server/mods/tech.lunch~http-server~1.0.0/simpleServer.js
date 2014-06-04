var vertx = require('vertx');
var console = require('vertx/console');

var server = vertx.createHttpServer();

server.requestHandler(function (request){

	var path = request.path();
	var response = '<h1>Hello Globaz...</h1><br/>';
	
	if(path === '/info'){
		response = response.concat(showRequestInfo(request));
	}
	
		
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


