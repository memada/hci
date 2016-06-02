

$( document ).ready(function() {
   // manipulationModule.hideElements('img');
	//manipulationModule.resizeElements('img');
	//manipulationModule.changeTextSize('p', 50);
	//manipulationModule.changeTextColor('p', '#FF0000');
	//manipulationModule.changeTextAligment('p', Constants.ALIGN_CENTER);
	//manipulationModule.changeTextFontFamily('p', Constants.FONT_COMIC_SANS);
	
	manipulationModule.resizeElements('img');

	var holdyDiv = $('<ul class=\"custom-menu\"><li data-action=\"first\"><img src=\"http://files.softicons.com/download/toolbar-icons/flatastic-icons-part-1-by-custom-icon-design/ico/delete1.ico\" /></li><li data-action=\"second\"><img src=\"https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/add-button-512.png\" /></li> <li data-action=\"third\"><img src=\"http://www.iconsdb.com/icons/preview/black/minus-5-xxl.png\" /></li><li data-action=\"fourth\"><img src=\"http://downloadicons.net/sites/default/files/video-play-icon-90356.png\"/></li></ul>').attr('id', 'holdy');
	holdyDiv.appendTo('body');
		

	var selectedElement;
	
	$(document).bind("contextmenu", function (event) {
		
		// Avoid the real one
		event.preventDefault();
		
		selectedElement = $( event.target );
		// Show contextmenu
		$(".custom-menu").show();
		
		// In the right position (the mouse)
		$(".custom-menu").css({
			top: event.pageY + "px",
			left: event.pageX -20 + "px"
		});
	});


	// If the document is clicked somewhere
	$(document).bind("mousedown", function (e) {
		
		// If the clicked element is not the menu
		if (!$(e.target).parents(".custom-menu").length > 0) {
			
			// Hide it
			$(".custom-menu").hide(100);
		}
	});


	// If the menu element is clicked
	$(".custom-menu li").click(function(){
		
		// This is the triggered action name
		switch($(this).attr("data-action")) {
			
			// A case for each action. Your actions here
			case "first": 
				selectedElement.remove();
				break;
			case "second":
				selectedElement.css("font-size", selectedElement.height() + 10 + "px");
				break;
			case "third": 
				selectedElement.css("font-size", selectedElement.height() - 10 + "px");
				break;
			case "fourth": 
				var txt = selectedElement.text();
				alert(txt);
				//selectedElement.children().css(" font-weight", 'bold');
				break;
		}
	  
		// Hide it AFTER the action was triggered
		$(".custom-menu").hide(100);
	  });

	  $( ".target" ).change(function(event) {
		alert( "Handler for .change() called." + event.target.nodeName );
	  });
});
