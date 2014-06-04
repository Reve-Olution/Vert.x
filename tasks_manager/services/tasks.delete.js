var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

//Suppression d'une tache
eventBus.registerHandler('tasks.delete', function(args,responder) {

	console.log('delete');
	console.log(args.id);
	
	eventBus.send('tasks.persistence',{
		action: 'delete', 
		collection: 'tasks', 
		matcher: {_id:args.id}
	},
	function(reply) {
		if (reply.status === "ok") {
			responder({});
		} else {
			console.log(reply.message);
		} 
	});
});

console.log('tasks.delete.js successfully deployed');