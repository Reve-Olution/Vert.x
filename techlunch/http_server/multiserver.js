var vertx = require('vertx');
var console = require('vertx/console')
var container = require('vertx/container');
var config = container.config;

container.deployVerticle('server.js',config['multiserver']['js']);
container.deployVerticle('Server.groovy',config['multiserver']['groovy']);

