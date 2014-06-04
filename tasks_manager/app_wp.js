var container = require("vertx/container");
   
container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: 8080,
	host: "localhost",
	bridge: true, inbound_permitted: [
       { address: 'tasks.list' },
       { address: 'task.save' },
       { address: 'task.delete' }
	]
});

 
     
container.deployVerticle('tasks.js');
