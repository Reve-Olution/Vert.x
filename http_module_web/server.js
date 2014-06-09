var container = require("vertx/container");
var console = require('vertx/console');
var eventBus = require('vertx/event_bus');
   
container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
	port: 9090,
	host: 'localhost'
});

console.log('Server started [localhost:9090]');
console.log('Test pages: main.html, main_java.html, main_groovy.html, main_js.html');