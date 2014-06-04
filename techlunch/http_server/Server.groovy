def server = vertx.createHttpServer();
def logger = container.logger
def config = container.config;

def port = config['port'];

logger.info("Port defined in configuration file: " + port);

if(null == port){
	logger.info "Parameter info setting to default value: 8080"
	port = 8080;
}


server.requestHandler{ request ->
	def htmlResponse = new StringBuilder();
	
	htmlResponse << '<h1>Request incomming</h1>';
	htmlResponse << '<h2>url</h2>';
	htmlResponse << request.uri;
	htmlResponse << '<h2>query</h2>';
	htmlResponse << request.query;
	
	//headers
	htmlResponse << '<h2>headers</h2>';
	
	for(param in request.params.entries){
		htmlResponse << param.key << ':' << param.value << '<br/>';
	}
	
	//params
	htmlResponse << '<h2>Param&#232;tres</h2>';
	
	
	for(header in request.headers.entries){
		htmlResponse << header.key << ':' << header.value << '<br/>';
	}
	
	request.response.end(htmlResponse.toString());
}

server.listen(port, "localhost") { 
	asyncResult -> logger.info "Server starting to listen in port: " + port
}


