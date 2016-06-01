
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
