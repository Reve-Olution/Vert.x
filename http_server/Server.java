import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.platform.Verticle;
import org.vertx.java.core.json.JsonObject;
import java.util.Map;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.core.AsyncResult;

public class Server extends Verticle {

	int port = 7070;
	String host = "localhost";
	
	public void start() {
	  
		final Logger logger = container.logger();
		
		//création du serveur
		vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
		
			//traitement requete
			public void handle(HttpServerRequest req) {
			
				logger.info("Got request: " + req.uri());
				logger.info("Headers are: ");
				
				for (Map.Entry<String, String> entry : req.headers()) {
					logger.info(entry.getKey() + ":" + entry.getValue());
				}
			
				//réponse client
				req.response().headers().set("Content-Type", "text/html; charset=UTF-8");
				req.response().end("<html><body><h1>Hello from vert.x! Java http Server</h1></body></html>");
			}
		}).listen(port,host, new Handler<AsyncResult<HttpServer>>() {
			
			public void handle(AsyncResult<HttpServer> result){
				logger.info("Server Java based started listenning [" + host + ":" + port +"]");
			}
			
		});
	  }
}