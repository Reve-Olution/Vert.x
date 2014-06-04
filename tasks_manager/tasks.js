var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

var tasks = {};

//liste des jours enregistrées
eventBus.registerHandler('days.list', function (args,responder) {
	eventBus.send('tasks.persistence',{
		action: 'find', 
		collection: 'tasks', 
		matcher: {},
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

//liste des taches
eventBus.registerHandler('tasks.list', function(args, responder) {

	eventBus.send('tasks.persistence',{
		action: 'find', 
		collection: 'tasks', 
		matcher: {}
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

console.log('tasks.js deployed');