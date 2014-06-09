var vertx = require('vertx')

var server = vertx.createHttpServer().
	ssl(true).
	keyStorePath('keystore.jks').
	keyStorePassword('dama6ne');

server.requestHandler(function(request) {
  
  request.response.end("<html><body><h1>Hello from vert.x!</h1></body></html>");
}).listen(4443, 'localhost');