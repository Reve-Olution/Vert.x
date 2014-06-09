var vertx = require('vertx');
var http = require('vertx/http');
var console = require('vertx/console')
var container = require('vertx/container');

//récupération de la configuration passé au verticle --> port
var config = container.config;
var port = config['port'];

console.log("Port defined in configuration file: " + port);

//creation du serveur
var server = vertx.createHttpServer();

//Port par défaut si null
if(port == null){
	console.log("Parameter info setting to default value: 8080");
	port = 8080;
}

//Request handler
server.requestHandler(function (request) {
	var htmlResponse = '';
	
	htmlResponse = htmlResponse.concat('<h1>Request incomming</h1>');
	htmlResponse = htmlResponse.concat('<h2>url</h2>');
	htmlResponse = htmlResponse.concat(request.uri());
	htmlResponse = htmlResponse.concat('<h2>query</h2>');
	htmlResponse = htmlResponse.concat(request.query());
	
	//headers
	htmlResponse = htmlResponse.concat('<h2>headers</h2>');
	
	request.headers().forEach(function(key, value) {
		htmlResponse = htmlResponse.concat(key,':',value,'<br/>');
	});
	
	//params
	htmlResponse += '<h2>Param&#232;tres</h2>';
	
	request.params().forEach(function(key, value) {
		htmlResponse = htmlResponse.concat(key,': ',value,'<br/>');
	});
	
	//retour reponse
	request.response.end(htmlResponse);
});

//Démarrage ecoute 
server.listen(port, "localhost", function () {
	console.log("Server starting to listen in port: ".concat(port));
})


