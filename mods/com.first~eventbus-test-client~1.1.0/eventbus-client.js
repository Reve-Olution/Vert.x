var vertx = require('vertx');
var bus = require('vertx/event_bus');
var console = require ('vertx/console');


bus.registerHandler("welcome-queue",function (message) {
	console.log("[welcome-queue]: " + message);
});

bus.registerHandler("helloWorld-queue",function (message) {
	console.log("[helloWorld-queue]: " + message);
});

bus.registerHandler("json-queue",function (message) {
	console.log("[json-queue]: " + message);
});
