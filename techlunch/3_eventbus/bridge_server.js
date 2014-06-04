var container = require("vertx/container");
var console = require('vertx/console');
var eventBus = require('vertx/event_bus');
   
container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: 8080,
	host: "localhost",
	bridge: true, 
	inbound_permitted: [
       { address: 'tech.lunch.1' },
       { address: 'tech.lunch.2' }
	],
	outbound_permitted : [
       { address: 'tech.lunch.1' },
       { address: 'tech.lunch.2' }
	]
});