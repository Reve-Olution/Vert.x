var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

//Sauvegarde d'une tache
eventBus.registerHandler('tasks.save', function(task, responder) {

	eventBus.send('tasks.persistence',{
		action: 'save', 
		collection: 'tasks', 
		document: task
	},
	function(reply) {
		if (reply.status === 'ok') {
			task._id = reply._id;
			responder(task);
		} else {
			console.log(reply.message);
		} 
	});
});

console.log('tasks.save.js successfully deployed');