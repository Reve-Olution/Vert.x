var vertx = require('vertx');
var eventbus = require('vertx/event_bus');
var console = require('vertx/console');

eventbus.registerHandler('tech.lunch.1', function (message, reply) {
	console.log('[tech.lunch.1] Message received: ' + message);
	reply('[tech.lunch.1]Message received ok!')
});

eventbus.registerHandler('tech.lunch.2', function (message, reply) {
	console.log('[tech.lunch.2] Message received: ' + message);
	reply('[tech.lunch.2]Message received ok!')
	
});

console.log('receiver.js started. Listenning messages on the eventbus [tech.lunch.1][tech.lunch.2]');