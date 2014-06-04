var vertx = require('vertx');
var http = require('vertx/http');
var console = require('vertx/console')
var container = require('vertx/container');

//récupération de la configuration passé au verticle --> port



//Demarrage du serveur en écoute
var tcpServer = vertx.createNetServer().connectHandler(
	function (socket){
		var addr = socket.remoteAddress();
		var strAddr = addr.ipaddress +':'+ addr.port;
		
		socket.write('Welcome to tcpServer,' + strAddr);
		
		//vertx.eventBus.registerHandler('broadcast_adress',
		//	function (event){
		//		socket.write(event);
		//	});
		
		socket.dataHandler (function (data) {
			
			var now = new Date();
			var msg = now + ' <' + strAddr + '> ' + data ;
			//vertx.eventBus.publish('broadcast_adress',msg);
			console.log(data.getByte(0));
			if(data.getByte(0)=== 13){
				console.log(data);
			}
			//console.log(msg);
			
		})
	}).listen(1212);

