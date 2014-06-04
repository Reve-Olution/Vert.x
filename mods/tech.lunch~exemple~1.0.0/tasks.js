var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var eventbus = require('vertx/event_bus');

eventbus.registerHandler('task.save',function (task,responder) {
	console.log('task save');			
	
	eventbus.send('mongo.persistence',{
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



eventbus.registerHandler('task.list',function () {
	console.log('task list');
});

console.log('tasks.js loaded');

