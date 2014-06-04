var eventBusUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/eventbus';

var eventBus = new vertx.EventBus(eventBusUrl);

var $console;

eventBus.onopen = function() {
	
	console.log('Event bus oo open');
	
	eventBus.registerHandler('tech.lunch.1', function (message,responder) {
		console.log(message);
		$console.append(message).append('<br/>');
	});
};

	
$(function () {
		
	$console = $('#console');	
});
