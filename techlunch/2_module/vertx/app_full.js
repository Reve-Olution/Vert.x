var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var logger = container.logger;

var config = container.config;

container.deployVerticle('http_server_full.js',config);
container.deployVerticle('tcp_server.js', config);

console.log('app.js deployed');


