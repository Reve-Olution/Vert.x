//html header de base
var htmlHeader = '<!doctype html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"></head><body>';
var htmlFooter = '</body></html>';
var jumboTron = '<div style="margin:10px;"><div class="jumbotron"><img src="images/js.jpg" width="100" height="75"/><h1>Javascript Http server</h1>';
var endJumboTron = '</div></div>';
var htmlGen = (typeof module !== 'undefined' && module.exports) || {};

htmlGen.generateOnFlyHtmlForParams = function (request) {
	
	var htmlOnFly = '';
	
	htmlOnFly = htmlOnFly.concat(htmlHeader,jumboTron);
	
	//header
	htmlOnFly = htmlOnFly.concat('<h2>Header</h2>');
	var headerParams = '';
	request.headers().forEach(function (cle,valeur) {
		headerParams = headerParams.concat(cle,':',valeur,'<br/>');
	});
	htmlOnFly = htmlOnFly.concat(headerParams);
	
	//paramètres
	htmlOnFly = htmlOnFly.concat('<h2>Paramètres de requêtes</h2>');
	var requestParams = '';
	request.params().forEach(function (cle,valeur) {
		requestParams = requestParams.concat(cle,':',valeur,'<br/>');
	});
	htmlOnFly = htmlOnFly.concat(requestParams,endJumboTron,htmlFooter);
	
	return htmlOnFly;
	
};


