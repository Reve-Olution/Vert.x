var vertx = require('vertx');
var console = require('vertx/console')
var container = require('vertx/container');

var config = container.config;

container.deployVerticle('server.js',config);
container.deployVerticle('Server.java',config);