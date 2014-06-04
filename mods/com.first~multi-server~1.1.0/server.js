var vertx = require('vertx');
var http = require('vertx/http');
var console = require('vertx/console')
var container = require('vertx/container');
var htmlGen = require ('lib/htmlGenerator.js');

//récupération de la configuration passé au verticle --> port
var config = container.config;
var port = parseInt(config['port']['js']);

var htmlFile = 'main_js.html';

//creation du serveur
var server = vertx.createHttpServer();

var routeMatcher = new http.RouteMatcher();

routeMatcher.get('/main', function(request) {
    request.response.sendFile('web/' + htmlFile);
});

routeMatcher.get('/params', function(request) {
    request.response.end(htmlGen.generateOnFlyHtmlForParams(request));
});

routeMatcher.get('/images/js.jpg', function(request) {
    request.response.sendFile('web/images/js.jpg');
});

routeMatcher.get('.*', function(request) {
    request.response.sendFile('web/error404.html');
});


//Demarrage du serveur en écoute
server.requestHandler(routeMatcher).listen(port,'localhost', function (error) {
	if(!error){
		console.log('Server [JS based] start listenning...on port: ' + port);
	}else{
		console.log('error:' + error);
	}
});

