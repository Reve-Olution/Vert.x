var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');

var config = container.config;


var server = vertx.createHttpServer();

server.requestHandler(function (request) {

	var path = request.path();
	var uri = request.uri();
	
	console.log('Request ....');
	request.response.end('<h1>Hello tech lunch...</h1><h2> ' + path + '</h2>');

}).listen(config.port,config.host, function () {
	console.log('Started : [' + config.host + ':' + config.port + ']');
});