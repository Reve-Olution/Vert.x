var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var logger = container.logger;

var config = container.config;

//var port = 1234;
//var host = 'localhost'

var port = config['tcp']['port'];
var host = config['host'];

if(port === undefined){
	port = 1234;
}
if(host === undefined){
	host = config['host'];
}

var server = vertx.createNetServer();

//ajout du handler
server.connectHandler(function (socket) {
	socket.dataHandler(function(buffer) {
		console.log('User connected');
        socket.write('Server Reply: ' + buffer);
    });
});

//Démmarage de l'écoute
server.listen(port,host, function (erreur) {
	if(!erreur){
		console.log('TCP server started [' + host + ':' + port + ']');
	}else{
		console.log(erreur)
	}
});

var vertxStop = function () {
	server.close();
	console.log('Verticle has been undeployed');
}

