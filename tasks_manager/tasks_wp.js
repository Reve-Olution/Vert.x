var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

var tasks = {};

eventBus.registerHandler('tasks.list', function(args, responder) {
 //responder({"tasks": Object.keys(tasks).map(function(key) {
 //  return tasks[key];
 //})});
 
 eventBus.send(
       'mindMaps.persistor',
       {action: "find", collection: "tasks", matcher: {}},
       function(reply) {
         if (reply.status === "ok") {
           responder({tasks: reply.results});
         } else {
           console.log(reply.message);
		   } }
	);
});

eventBus.registerHandler('task.save', function(task, responder) {
 //console.log('save');
 
 //if (!task._id) {
 //  task._id = Math.random();
 //}
 //tasks[task._id] = task;
 //responder(task);
 eventBus.send(
         'mindMaps.persistor',
         {action: "save", collection: "tasks", document: task},
         function(reply) {
           if (reply.status === "ok") {
             task._id = reply._id;
             responder(task);
           } else {
             console.log(reply.message);
			 } }
			 );
});

eventBus.registerHandler('task.delete', function(args,
 responder) {
 console.log(args.id);
 delete tasks[args.id];
 responder({});
});

console.log('tasks.js deployed');