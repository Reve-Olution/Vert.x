var container = require("vertx/container");
var console = require('vertx/console');
var eventBus = require('vertx/event_bus');

var config = container.config;
var port;
var host;

port = config.port;
host = config.host;
	
if(port === undefined){
	console.log('No port config passed, default value will bes used [8888]');
	port = 8888;
}
if(host === undefined){
	console.log('No host config passed, default value will bes used [localhost]');
	host = 'localhost';
}



container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: port,
	host: host,
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

console.log('bridge_server.js started [' + host +':' + port + ']. Receiving messages in the eventbus [tech.lunch.1][tech.lunch.2]');