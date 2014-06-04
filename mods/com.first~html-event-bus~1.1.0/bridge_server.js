var container = require("vertx/container");
var console = require('vertx/console');
var eventBus = require('vertx/event_bus');
   
var config = container.config;

container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: config.port,
	host: config.host,
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

console.log('bridge_server.js started [' + config.host +':' + config.port + ']. Sending messages in the eventbus [tech.lunch.1][tech.lunch.2]');