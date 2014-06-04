var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');

container.deployModule('io.vertx~mod-web-server~2.0.0-final',{
	port:8090,
	host:'localhost',
	bridge:true,
	inbound_permitted:[
		{address:'task.save'},
		{address:'task.list'}
	]
});

container.deployModule('io.vertx~mod-mongo-persistor~2.0.0-final',{
	address: 'mongo.persistence',
	db_name:'techlunch_example'
});

container.deployVerticle('tasks.js');

console.log('app.js loaded');

