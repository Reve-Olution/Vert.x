var vertx = require('vertx');
var console = require('vertx/console')
var container = require('vertx/container');

var config = {
    "port": {
	    "java":		"7070",
	    "js":		"7071",
	    "groovy":	7072
    },
    "host": "localhost"
}

container.deployVerticle('server.js',config);
container.deployVerticle('Server.java',config);
container.deployVerticle('Server.groovy',config);