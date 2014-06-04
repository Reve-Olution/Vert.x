var vertx = require('vertx');
var console = require('vertx/console');

var sharedMap = vertx.getMap('tech.lunch.map');
var sharedSet = vertx.getSet('tech.lunch.set');

sharedMap.put('key1','Globaz');
sharedMap.put('key2','TechLunch');

sharedSet.add('Globaz');
sharedSet.add('TechLunch');

console.log("key1: " + sharedMap.get('key1'));
console.log("key2: " + sharedMap.get('key2'));