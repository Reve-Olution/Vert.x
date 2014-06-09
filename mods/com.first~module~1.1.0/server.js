var vertx = require('vertx');
var console = require('vertx/console')
var container = require('vertx/container');

//récupération de la configuration passé au verticle --> port
var config = container.config;
var port = parseInt(config['port']['js']);

//creation du serveur
var server = vertx.createHttpServer();

//handler de requete
server.requestHandler(function (request) {
	var htmlFile = 'main_js.html';
	var requestParams = '';
	
	switch(request.path()){
		case '/main':
			request.response.sendFile('web/' + htmlFile);
		break;
		
		case '/params': 
			request.response.end(htmlGen.generateOnFlyHtmlForParams(request));
		break;
		default:
			request.response.sendFile('web/error404.html');
	}
});

//Demarrage du serveur en écoute
server.listen(port,'localhost', function (error) {
	if(!error){
		console.log('Server stating listenning...on port:' + port);
	}else{
		console.log('error:' + error);
	}
});

