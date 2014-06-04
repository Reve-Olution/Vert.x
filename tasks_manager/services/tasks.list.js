var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

//liste des taches
eventBus.registerHandler('tasks.list', function(args, responder) {

	eventBus.send('tasks.persistence',{
		action: 'find', 
		collection: 'tasks', 
		matcher: args
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

console.log('tasks.list.js successfully deployed');