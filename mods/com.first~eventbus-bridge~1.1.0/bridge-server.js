var vertx = require('vertx');
var container = require('vertx/container');
var console = require('vertx/console')

var server = vertx.createHttpServer();

server.requestHandler(function (req) {
	var fichier = req.path() === '/' ? 'index.hml': req.path();
	req.response.sendFile("./" + fichier);
})

vertx.createSockJSServer(server).bridge({prefix: "/eventbus"},[{}],[{}]);

server.listen(9999);
