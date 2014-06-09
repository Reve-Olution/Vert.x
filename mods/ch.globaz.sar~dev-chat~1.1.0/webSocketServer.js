
var vertx = require('vertx');
var http = require('vertx/http');
var console = require('vertx/console')
var container = require('vertx/container');
var eventBus = vertx.eventBus;

//tableau des utilisateurs actuellement sur le chat
var users = [];

//handler de demande de login utilisateur
eventBus.registerHandler('user.ask_login', function (message, reponse) {
	
	if(!isLoginPresent(message.userName)){
		users.push(message.userName);
		reponse({'status':200});
		console.log('ok');
	}else{
		reponse({'status':999});
		console.log('pas ok');
	}
	
	
	//Envoi de publication utilisateur connecté
	eventBus.publish('user.logged',{
		'status':200,
		'username':message.userName,
		'message':message, 
		'users':users}
	);
});

/**
Message posté par un utilisateur
*/
eventBus.registerHandler('message.post', function (message) {
	//renoi en publication
	vertx.eventBus.publish("message.posted", message);
	
});

vertx.setPeriodic(15000,function () {
	console.log('periodic');
	
	users.forEach(function (user) {
		
		var busAdress = 'user.' + user;
		
		eventBus.sendWithTimeout(busAdress, '', 3000, function (cause,message) {
			
			if(cause !== null){
			
				var index = users.indexOf(user);
				
				users.splice(index,1);
				eventBus.unregisterHandler(busAdress);
				
				eventBus.publish('user.status',{
					'status':200,
					'users':users}
				);
				
			}
			
		});	
	});
});

container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: 9090,
	host: 'localhost',
	bridge: true, 
	index_page: 'ws.html',
	inbound_permitted: [{}],
	outbound_permitted : [{}]
});


var isLoginPresent = function (userName) {
	
	var loginPresent = false;
	
	users.forEach(function (user) {
		if (user === userName){
			loginPresent = true;
		}
	})
	
	return loginPresent;
	
}





