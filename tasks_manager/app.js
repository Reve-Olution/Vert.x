var container = require("vertx/container");
var console = require('vertx/console');
var eventBus = require('vertx/event_bus');
   
container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: 8080,
	host: "localhost",
	bridge: true, inbound_permitted: [
       { address: 'tasks.list' },
       { address: 'tasks.save' },
       { address: 'tasks.delete' },
       { address: 'tasks.update' },
	   { address: 'days.list' }
	]
});

//Déploiement module mongodb
container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final",{
	address: "tasks.persistence",
	db_name: "vertx_tasks"
});
     
//container.deployVerticle('tasks.js');
container.deployVerticle('services/tasks.list.js');
container.deployVerticle('services/tasks.update.js');
container.deployVerticle('services/tasks.delete.js');
container.deployVerticle('services/tasks.save.js');
container.deployVerticle('services/days.list.js');
