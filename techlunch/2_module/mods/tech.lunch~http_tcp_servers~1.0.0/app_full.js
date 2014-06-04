var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var logger = container.logger;

var config = {
	"port":9090,
	"host":"localhost",
	"tcp":{
		"port":1212
	}
}


container.deployVerticle('http_server_full.js',config);
container.deployVerticle('tcp_server.js', config);

console.log('app_full.js deployed');


