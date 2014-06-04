var vertx = require('vertx');
var container = require('vertx/container');


var config = {
	"port":9999,
	"host":"localhost"
}

container.deployVerticle('bridge_server.js',config);
container.deployVerticle('sender.js');