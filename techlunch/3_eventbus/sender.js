var vertx = require('vertx');
var eventbus = require('vertx/event_bus');
var console = require('vertx/console');
var cpt1 = 0;
var cpt2 = 0;

vertx.setPeriodic(1000,function () {

	console.log('periodic iteration');
	eventbus.send('tech.lunch.1','[' + new Date() + ' - tech.lunch.1 - msg n° ' + cpt1 +'] Hello Tech Lunch  ', function (reply){
		console.log('reply: ' + reply);
	});
	cpt1++;
});

vertx.setPeriodic(1500, function () {
	eventbus.send('tech.lunch.2','[' + new Date() + ' - tech.lunch.2 - msg n° ' + cpt2 +'] Hello Tech Lunch');
	cpt2++;
});

