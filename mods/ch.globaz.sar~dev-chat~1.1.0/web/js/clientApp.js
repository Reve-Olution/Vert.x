var app = {
	
	/** Variables objets gui jquery */
	$chat_header			:'',
	$btn_send_message		:'',
	$input_message			:'',
	$message_zone			:'',
	$userListContainer		:'',
	
	/** eventbus **/
	eventBus				:'',
	eventBusUri				:'http://localhost:9090/eventbus',
	
	labels : {
		login_error			:'<div class="alert alert-danger login-error">[]</div>',
		login_msg 			:'<input type="text" id="pseudo"></input>',
		login_title			:'Entrez votre pseudo:',
		welcome_msg			:'Bienvenue ',
		login_not_valid		:'Le login ne peut pas &ecirc;tre vide',
		login_already_used	:'Ce login est d&eacute;j&agrave; utilis&eacute;'
	},
	
	userName				:'',
	/**
	Démarrage de l'application
	*/
	start : function () {
		
		this.initGUI();
		
		eventBus = new vertx.EventBus(this.eventBusUri);
		//connexion eventbus ok
		var that = this;
		eventBus.onopen = function () {
			that.initEventBusEvents();
		}
	},
	
	
	
	/**
	Initialisation des handler de l'eventbus
	*/
	initEventBusEvents : function () {
		//affichage modal login
		this.showLogWindow();
				
		var that = this;
		//ecoute utilisateur connecté
		eventBus.registerHandler('user.logged', function (message) {
			var ta = new TinyAlert();
			ta.show('Utilisateur connect&eacute;',message.username + ' just connected...');
			that.displayUsers(message.users);						
		});
				
		//Ecoute mise à jour users
		eventBus.registerHandler('user.status', function (message) {
			var taa= new TinyAlert();
			taa.show('Utilisateur d&eacute;connect&eacute;',message.userDisconnect + ' seems to be disconnected...');

			console.log(message.users);
			that.displayUsers(message.users);						
		});
		
		
		
		
	},
	
	/**
	Initialisation des composants GUI de la page et des évvénements associés
	*/
	initGUI : function () {
		$chat_header = $('#chat_header');
		$btn_send_message = $('#btn_send_message');
		$input_message = $('#input_message');
		$message_zone = $('#message_zone');
		$userListContainer = $("#userListContainer");
		
		var that = this;
		//Keyup sur la zone texte du message
		$input_message.keyup(function (event) {
			if($input_message.val().length > 0){
				
				$btn_send_message.removeClass('btn btn-danger').addClass('btn').addClass('btn-success');
				if(event.keyCode === 13){
					that.send();
				}
			}else{
				$btn_send_message.removeClass('btn btn-success').addClass('btn').addClass('btn-danger');
			}
		});
	},
	
	/**
	Affichage de la modal de login
	*/
	showLogWindow : function (errorMessage) {
		var that = this;
		
		var errorMsgToAppend = '';
		console.log(errorMessage);
		if(errorMessage !== undefined){
			errorMsgToAppend = that.labels.login_error;
			errorMsgToAppend = errorMsgToAppend.replace('[]',errorMessage);
		}
		
		BootstrapDialog.show({
            title	: that.labels.login_title,
            message	: that.labels.login_msg + errorMsgToAppend,
            closable: false,
            buttons: [{
                label: 'ok',
                cssClass: 'btn-primary',
                hotkey: 13,
                action: function(dialog) {
                    
                    var pseudo = $('#pseudo').val();
                    console.log('pseudo: ' + pseudo);
                    
                    if(pseudo === null || pseudo === ''){
                    	dialog.close();
	                    that.showLogWindow(that.labels.login_not_valid);
                    }else{
	                    userName = pseudo;
	                    
	                    that.login();
	                    
	                    dialog.close();
	                    $input_message.focus();
                    }
                }
            }]
        });
	},
	
	login : function () {
		var that = this;
		
		//Envoi de demande de login sur le bus
		eventBus.send('user.ask_login', {'userName':userName}, function (reponse) {
				if(reponse.status === 200){
					$btn_send_message.on('click', function () {
						if($input_message.val().length > 0){
							that.send();	
						}
						
					});
					
					eventBus.registerHandler("message.posted", function (message) {
						$message_zone.append(message.userName + ": " + message.text + "<br/>");
						that.followScroll ();
					});
					
					console.log('user.' + userName);
					//Ecoute bus user unique
					eventBus.registerHandler('user.' + userName, function (message,reply) {
						console.log('MESSAGE!');
						reply('ok');						
					});
					$chat_header.html(that.labels.welcome_msg + userName);
				}else{
					that.showLogWindow(that.labels.login_already_used);
					
				}
			})
   },
   
  send : function () {
		if(eventBus.readyState() === 1){
			var message = $input_message.val();
			eventBus.send('message.post', {'userName':userName, 'text':message});
			$btn_send_message.removeClass('btn btn-success').addClass('btn').addClass('btn-danger');
			$input_message.val('');
		}else{
			BootstrapDialog.alert({
	            title: 'Connection perdue',
	            message: '<h4>La connexion avec le serveur &agrave; &eacute;t&eacute; perdue!<br/>La page va &ecirc;tre recharg&eacute;e</h4>',
	            type: BootstrapDialog.TYPE_WARNING, 
	            closable: true, 	            
	            buttonLabel: 'Ok', 
	            callback: function(result) {
	                window.location.href = "http://localhost:9090";
	            }
	        });
		}
      
    },
    
    followScroll : function () {
		$message_zone.scrollTop($message_zone[0].scrollHeight);
	},
	
	displayUsers : function (users) {

		$userListContainer.empty();
		users.forEach(function (user) {
			$userListContainer.append('<span class="glyphicon glyphicon-user"></span>    ' + user + '<br/>');
		});
	} 
	
	
}