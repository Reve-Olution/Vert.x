var vertx = require('vertx');
var http = require('vertx/http');
var console = require('vertx/console')
var container = require('vertx/container');

//tableau des utilisateurs actuellement sur le chat
var users = [];

//handler de demande de login utilisateur
vertx.eventBus.registerHandler('user.ask_login', function (message, reponse) {
	
	reponse({'status':200});
	
	users.push(message.userName);
	
	//Envoi de publication utilisateur connecté
	vertx.eventBus.publish('user.logged',{
		'status':200,
		'username':message.userName,
		'message':message, 
		'users':users}
	);
	
});

/**
Message posté par un utilisateur
*/
vertx.eventBus.registerHandler('message.post', function (message) {
	//renoi en publication
	vertx.eventBus.publish("message.posted", message);
	
});

container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: 9090,
	host: 'localhost',
	bridge: true, 
	index_page: 'ws.html',
	inbound_permitted: [{}],
	outbound_permitted : [{}]
});




