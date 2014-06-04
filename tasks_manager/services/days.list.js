var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

//liste des jours enregistrées
eventBus.registerHandler('days.list', function (args,responder) {
	eventBus.send('tasks.persistence',{
		action: 'find', 
		collection: 'tasks', 
		matcher: args,
		keys: {'date':1}
	},
	function(reply) {
		if (reply.status === 'ok') {
			responder({tasks: reply.results});
		} 
		else {
			console.log(reply.message)
		} 
	});
});

console.log('days.list.js successfully deployed');