var container = require("vertx/container");
var console = require('vertx/console');
   
container.deployVerticle('dataInitializer.js');
container.deployVerticle('dataUser.js');
