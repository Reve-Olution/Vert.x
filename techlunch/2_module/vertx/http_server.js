var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var logger = container.logger;

var config = container.config;

var port = 9090;
var host = 'localhost'

var server = vertx.createHttpServer();

//ajout du handler
server.requestHandler(function (request) {
	request.response.end('<html><body><h1>Hello Tech Lunch</h1></body></html>');
});

//Démmarage de l'écoute
server.listen(port,host, function () {
	console.log('Server started [' + host + ':' + port + ']');
});







