var vertx = require('vertx');

vertx.setPeriodic(1000, function () {

	var date = new Date();
	
	vertx.eventBus.publish("welcome-queue","[" + date + "[welcome-queue]] - Welcome!");
	vertx.eventBus.publish("helloWorld-queue","[" + date + "[helloWorld-queue]] - Hello world");
	vertx.eventBus.publish("json-queue","[" + date + "[json-queue]] - {'app':'eventbus Test','mainjs':'eventbus.js'}");
});