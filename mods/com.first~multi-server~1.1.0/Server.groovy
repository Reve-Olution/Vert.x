import org.vertx.groovy.core.http.RouteMatcher

def server = vertx.createHttpServer();
def logger = container.logger
def config = container.config;


def port = config['port']['groovy'];



def rm = new RouteMatcher();



rm.get('/main') { request ->
 request.response.sendFile 'web/main_groovy.html';
}

rm.get('/images/groovy.png'){ request -> 
	request.response.sendFile 'web/images/groovy.png';
}

rm.get('/params'){ request -> 
	logger.info "right"
	request.response.end generateOnFlyHtmlForParams(request);
}

rm.get('.*'){ request -> 
	request.response.sendFile 'web/error404.html';
}


def generateOnFlyHtmlForParams(request){
	def htmlHeader = "<!doctype html><html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><link rel='stylesheet' href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'></head><body>";
	def htmlFooter = "</body></html>";
	def jumboTron = "<div style='margin:10px;'><div class='jumbotron'><img src='images/groovy.png' width='100' height='75'/><h1>Groovy Http server</h1>";
	def endJumboTron = "</div></div>";
	
	def html = new StringBuilder();
	html << '' << htmlHeader << jumboTron;
	
	html << generateHtmlHeader(request);
	html << generateHtmlRequest(request);
	return html.toString();
}

def generateHtmlHeader(request){
	def headers = new StringBuilder();
	
	headers << "<h2>Header</h2>";
	for (header  in request.headers.entries) {
        headers << header.key << ": " << header.value << '<br/>'
    }
	
	return headers;
}
	
def generateHtmlRequest (request) {
	def requests = new StringBuilder();
	
	requests << "<h2>Param&#232;tres de requ&#234;tes</h2>";
	for (requestParams  in request.params.entries) {
        requests << requestParams.key << ": " << requestParams.value << '<br/>'
    }
	
	return requests;
}


server.requestHandler(rm.asClosure()).listen(port,'localhost'){asyncResult -> 
	logger.info "Server [Groovy based] start listenning...port: " + port;
};	


