var vertx = require('vertx');
var console = require('vertx/console');

var sharedMap = vertx.getMap('tech.lunch.map');
var sharedSet = vertx.getSet('tech.lunch.set');

console.log("key1: " + sharedMap.get('key1'));
console.log("key2: " + sharedMap.get('key2'));

//console.log(sharedSet);
