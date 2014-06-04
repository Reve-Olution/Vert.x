var vertx = require('vertx');
var eventbus = require('vertx/event_bus');

var cpt1 = 0;
var cpt2 = 0;

vertx.setPeriodic(1000,function () {
	eventbus.publish('tech.lunch.1','[' + new Date() + ' - tech.lunch.1 - msg n° ' + cpt1 +'] Hello Tech Lunch  ');
	cpt1++;
});

vertx.setPeriodic(1500, function () {
	eventbus.publish('tech.lunch.2','[' + new Date() + ' - tech.lunch.2 - msg n° ' + cpt2 +'] Hello Tech Lunch');
	cpt2++;
});

