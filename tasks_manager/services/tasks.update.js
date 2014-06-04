var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

//mise à jour d'une tache
eventBus.registerHandler('tasks.update', function (task,responder){
	console.log('ok update');
	console.log('id:' + task._id + ',name: ' + task.name + ',duree:' + task.duree);
	eventBus.send('tasks.persistence',{
		action:'update',
		collection: 'tasks', 
		objNew:{
			$set:{
				duree:task.duree
			}
		}, 
		criteria:{_id:task._id}
	},
	function(reply) {
		if (reply.status === "ok") {
			task._id = reply._id;
			responder(task);
		} else {
			console.log(reply.message);
		} 
	});
});

console.log('tasks.update.js successfully deployed');