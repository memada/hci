var wheelJs = document.createElement('script');
wheelJs.src = chrome.extension.getURL('app/wheel/wheelnav.min.js');

var raph = document.createElement('script');
raph.src = chrome.extension.getURL('app/wheel/raphael.min.js');

var raphicon = document.createElement('script');
raphicon.src = chrome.extension.getURL('app/wheel/raphael.icons.min.js');

var scriptElement = document.createElement('script');
scriptElement.src = chrome.extension.getURL('app/wheel/wheelfunc.js');

var settingsElement = document.createElement('script');

new Settings().getSettings().then(function(settings){
  settingsElement.innerText = "var currentHelperSettings = " + JSON.stringify(settings) + ";";
  document.body.appendChild(settingsElement);
  document.body.appendChild(raphicon);
  document.body.appendChild(raph);
  document.body.appendChild(wheelJs);
  setTimeout(function(){
    document.body.appendChild(scriptElement);
  }, 2000);
});
