

var manipulationModule = (function () {
    var employeeList = [];
	
    var hideElements = function (selector) {
        $(selector).hide();
    };
	
	var resizeElements = function (selector) {
		$(selector).resizable({
			autoHide: true,
			stop: function(e, ui) {
				var parent = ui.element.parent();
				ui.element.css({
					width: ui.element.width()/parent.width()*100+"%",
					height: ui.element.height()/parent.height()*100+"%"
				});
			}
		});
	};
	
    
    var changeTextSize = function(selector, size) {
        $(selector).css("font-size", size + "px");
    };
	var changeTextColor = function(selector, color) {
        $(selector).css('color', color);
    };
	var changeTextAligment = function(selector, align) {
        $(selector).css('text-align', align);
    };
	var changeTextFontFamily = function(selector, font) {
        $(selector).css('font-family', font);
    };
	
    return {
        hideElements : hideElements,
		resizeElements : resizeElements,
        changeTextSize : changeTextSize,
		changeTextColor : changeTextColor,
		changeTextAligment : changeTextAligment,
		changeTextFontFamily: changeTextFontFamily
    };
} ());


var Constants = {
	ALIGN_LEFT : 'left',
	ALIGN_RIGHT : 'right',
	ALIGN_CENTER : 'center',
	FONT_TIMES_NEW_ROMAN : '"Times New Roman", Times, serif',
	FONT_GEORGIA : 'Georgia, serif',
	FONT_ARIAL : 'Arial, Helvetica, sans-serif',
	FONT_COMIC_SANS : '"Comic Sans MS", cursive, sans-serif'
};

$( document ).ready(function() {
    manipulationModule.hideElements('img');
	//manipulationModule.resizeElements('img');
	manipulationModule.changeTextSize('.product-desc', 50);
	manipulationModule.changeTextColor('.product-desc', '#FF0000');
	manipulationModule.changeTextAligment('.product-desc', Constants.ALIGN_CENTER);
	manipulationModule.changeTextFontFamily('.product-desc', Constants.FONT_COMIC_SANS);
	
	
});