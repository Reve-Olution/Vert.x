Exemples de tests eventbus
==========================

<b>receiver.js</b>      : handler sur evenbus adresse [tech.lunch.1][tech.lunch.2]  
<b>sender.js</b>        : envoi de message point à point [tech.lunch.1][tech.lunch.2]  
<b>bridge_server.js</b> : server htpp port 8080, avec bridge sur adresse evenbus [tech.lunch.1][tech.lunch.2]  
<b>publish_sender.js</b>: envoi de publication sur adresse  [tech.lunch.1][tech.lunch.2]  


<b>Exemple d'utilisation:</b>
<pre>vertx run receiver.js -cluster  
vertx run sender.js -cluster</pre>
<pre>vertx run receiver.js -cluster  
vertx run publish_sender.js -cluster</pre>
