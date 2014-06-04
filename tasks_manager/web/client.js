var eventBusUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/eventbus';

var eventBus = new vertx.EventBus(eventBusUrl);



eventBus.onopen = function() {

	var displayOldDays = function (oldDaysArray) {
		var $ul = $('<ul/>',{
			class : 'nav nav-pills'
		});
		
		for (var day in oldDaysArray) {
			$('<li/>',{
				html:'<a href="#">' + dateUtil.getLocaleDateFromMongo(oldDaysArray[day]) +' <span class="badge">42</span></a>'
			}).appendTo($ul);
		}
		
		$ul.appendTo($('#old-task-div'));
	}
	
	//Ajout de la tache - composant gui
	var displayTaskInList = function (task) {
       
       //container principal tache
       var $taskMainDiv = $('<div/>',{
	       class: 'panel panel-default',
	       id: task._id
       });
       
       //Zone titre
       var $taskTitleDiv = $('<div/>',{
	       class: 'panel-heading',
	       html : '<span>'+task.name+'</span>'
       });
       
       
       //bouton de suppression       
	   var $deleteButton = $('<button/>',{
	       type : 'button',
	       class: 'btn btn-default btn-xs btn-delete',
	       html: '<span class="glyphicon glyphicon-minus-sign"></span>',
	       click: function () {
	       		 $( "#dialog-confirm" ).dialog({
					resizable: false,
					height:180,
					modal: true,
					buttons: {
						"Supprimer": function() {
							eventBus.send('tasks.delete', {id: task._id}, function(result){
					        	$taskMainDiv.remove();
							});
							$(this).dialog('close');
						},
						Cancel: function() {
							$(this).dialog('close');
						}
					}
				});
					
	       		
	       }
       });
       
	   //Zone principal tache
       var $taskBodyDiv = $('<div/>',{
	       class: 'panel-body'       
	   });
	   
	   //label duree
	   var $spanLabelTask = $('<span/>',{
	       html:'Durée:  ' + dateUtil.convertDecimalToHH_MM(task.duree),
	       class: 'green'
       });

	   //slider
	   var $slider = $('<div/>',{
	       id: 'slider-duree-' + task._id,
	       class: 'time_slider',
       });
       
       
       $slider.slider({
       		range: "min",
       		value: task.duree,
			min: 1,
			max: 12,
			step: 0.25,
			slide: function( event, ui ) {
				$spanLabelTask.html('Durée:  ' + dateUtil.convertDecimalToHH_MM(ui.value));
			},
			start:function (event,ui){
				$spanLabelTask.removeClass().addClass('red');
			},
			stop: function (event,ui) {
				eventBus.send('tasks.update', {_id:task._id,duree:ui.value}, function(result){
		        	console.log('result');
		        	console.log(result);
		        	$spanLabelTask.removeClass().addClass('green');
		         
		       });

			}
		});

	   $taskTitleDiv.appendTo($taskMainDiv);
	   $deleteButton.prependTo($taskTitleDiv);
	   $spanLabelTask.appendTo($taskBodyDiv);
       $taskBodyDiv.appendTo($taskMainDiv);
	   $slider.appendTo($taskBodyDiv);
	   $taskMainDiv.appendTo('#tasks-div');
	};
	
	//Envoi du formulaire de creation de tache
	$('.create-form').submit(function() {
       var nameInput = $('[name=name]', this);
       
	   
       eventBus.send('tasks.save', {name: nameInput.val(), duree:0,date:dateUtil.convertDateToMongoStr(new Date())}, function(result){
       		displayTaskInList(result);
       		nameInput.val('');
       });
       return false;
     });
     
     //Lancement de la recheche des taches sur ouverture du bus
    eventBus.send('tasks.list', {'date':dateUtil.convertDateToMongoStr(new Date())}, function(res) {
		$.each(res.tasks, function() {
        	displayTaskInList(this);
		});
	});
	
	//liste des tâches pour recherche date autre que aujourd'hui
	eventBus.send('days.list',{
		'date': {
				$ne:dateUtil.convertDateToMongoStr(new Date())
			}
		},function(res) {		
			var oldDays = new Array();
			
			$.each(res.tasks, function() {
				console.log(this);
				oldDays.push(this.date);
			});
			
			console.log(arrayUtil.uniqueValues(oldDays));
		
			displayOldDays(arrayUtil.uniqueValues(oldDays));	
		});
	};

$(function () {
	console.log('dom ready');
	
	$('#dialog-confirm').hide();
	
		$('#day_title').html('Tâches du jour - ' + dateUtil.getLocaleDate(new Date()));
	
});
