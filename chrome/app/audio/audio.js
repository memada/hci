
var a = document.createElement('a');
var linkText = document.createTextNode("play!");
a.appendChild(linkText);
a.className="play";
a.href = "#";
a.onclick=function() {
    var elements = document.body.getElementsByTagName("*");
    var text="";
    for (var i = 0; i < elements.length; i++) {
      var current = elements[i];
      if (current.children.length === 0 && current.textContent.replace(/ |\n/g, '') !== '') {
        text += (current.textContent);
      }
    }
    console.log(text);
    responsiveVoice.speak(text);
  }
document.body.appendChild(a);

document.body.appendChild(document.createElement('br'));
document.body.appendChild(document.createElement('br'));
var a2 = document.createElement('a');
var linkText2 = document.createTextNode("play selected!");
a2.appendChild(linkText2);
document.body.appendChild(document.createElement('br'));
a2.className="playSelected";
a2.href = "#";
a2.onclick=function () {
    responsiveVoice.speak(window.getSelection().toString());
  }
document.body.appendChild(a2);


var audio=document.createElement('audio')
audio.className="speech";
audio.hidden=true;
document.body.appendChild(audio);



