var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var config = container.config;

var config2 = {
	"port":8888,
	"host":"localhost"
};

var config = {
	"port":8988,
	"host":"localhost"
};


container.deployVerticle('server.js',config);
container.deployVerticle('server.js',config2);