function zoomWith(size) {
  var	n, 
  		walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);

  while(n=walk.nextNode())  {
  	n.parentElement.setAttribute('style', settings.asStyle());
  }
}

function hideImages() {
	console.log('ascund imaginile');
	Array.prototype.map.call(document.images, function(image) {
		image.style.display = 'none';
	});
}

function zoomIn() {

}

function zoomOut() {

}


var wheelElement = document.createElement('div');
 wheelElement.setAttribute('id','piemenu');
 wheelElement.setAttribute('data-wheelnav',null);
 wheelElement.setAttribute('data-wheelnav-slicepath','PieSlice');
 wheelElement.setAttribute('data-wheelnav-spreader',null);
 wheelElement.setAttribute('data-wheelnav-spreaderpath','PieSpreader');
 wheelElement.setAttribute('data-wheelnav-rotateoff',null);
 wheelElement.setAttribute('data-wheelnav-navangle','270');
 wheelElement.setAttribute('data-wheelnav-cssmode',null);
 wheelElement.setAttribute('data-wheelnav-init',null);
 wheelElement.innerHTML = "<div data-wheelnav-navitemtext='+' onmouseup='zoomIn()'></div>" +
  "<div data-wheelnav-navitemtext='-' onmouseup='zoomOut()'></div>" +
  "<div data-wheelnav-navitemtext='Hide Text' onmouseup='hideText()'></div>" +
  "<div data-wheelnav-navitemtext='Hide Video' onmouseup='hideVideo()'></div>" +
  "<div data-wheelnav-navitemtext='Hide Images' onmouseup='hideImages'></div>" +
  "<div data-wheelnav-navitemtext='Reset' onmouseup='reset()'></div>";


document.body.appendChild(wheelElement);

var piemenu = new wheelnav('piemenu');
piemenu.spreaderInTitle = icon.plus;
piemenu.spreaderOutTitle = icon.cross;
piemenu.spreaderRadius = piemenu.wheelRadius * 0.13;
piemenu.clockwise = true;
piemenu.sliceInitPathFunction = piemenu.slicePathFunction;
piemenu.initPercent = 0.1;
piemenu.wheelRadius = piemenu.wheelRadius * 0.83;
piemenu.createWheel();