import org.vertx.java.core.Handler;
import org.vertx.java.core.AsyncResult;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.platform.Verticle;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.http.RouteMatcher;

import java.util.Map.Entry;

public class Server extends Verticle {

  public void start() {
  
  	JsonObject config = container.config();
  
  	JsonObject port = config.getObject("port");
  	
  	final int portNumber = Integer.parseInt(port.getString("java"));
  	final String htmlFile = "main_java.html";
  
	HttpServer server = vertx.createHttpServer();
	
	RouteMatcher rm = new RouteMatcher();
	
	rm.get("/main", new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest request) {
        request.response().sendFile("web/" + htmlFile);
      }
    });
    
    rm.get("/params", new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest request) {
        request.response().end(HtmlGenerator.generateOnFlyHtmlForParams(request));      
      }
    });
    
   rm.get("/images/java.png", new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest request) {
        request.response().sendFile("web/images/java.png");      
       }
    });
    
    
	//error page 
	rm.get(".*", new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest request) {
        request.response().sendFile("web/error404.html");
      }
    });

	
	server.requestHandler(rm).listen(portNumber, "localhost", new Handler<AsyncResult<HttpServer>> () {
		public void handle(AsyncResult<HttpServer> asyncResult){
			System.out.println("Server [Java based] start listenning...on port: " + portNumber);
		}
	});
	
	
  }
  
  static class HtmlGenerator{
		static String htmlHeader = "<!doctype html><html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><link rel='stylesheet' href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css'></head><body>";
		static String htmlFooter = "</body></html>";
		static String jumboTron = "<div style='margin:10px;'><div class='jumbotron'><img src='images/java.png' width='100' height='75'/><h1>Java Http server</h1>";
		static String endJumboTron = "</div></div>";
	
		static String generateOnFlyHtmlForParams(HttpServerRequest request){
			StringBuilder htmlOnFly = new StringBuilder("");
			
			htmlOnFly.append(htmlHeader).append(jumboTron);
			
			//header
			htmlOnFly.append("<h2>Header</h2>");
			StringBuilder headerParams = new StringBuilder("");
			for(Entry<String,String>entry:request.headers()){
				headerParams.append(entry.getKey()).append(":").append(entry.getValue()).append("<br/>");
			}
			htmlOnFly.append(headerParams);
		
			//paramètres
			htmlOnFly.append("<h2>Param&#232;tres de requ&#234;tes</h2>");
			StringBuilder requestParams = new StringBuilder("");
			for(Entry<String,String>entry:request.params()){
				requestParams.append(entry.getKey()).append(":").append(entry.getValue()).append("<br/>");
			}
			htmlOnFly.append(requestParams);
			
			
			return htmlOnFly.toString();
		}
	}
}