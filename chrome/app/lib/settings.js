var Settings = (function () {
    var currentSettings = {
        fontSize: 1,
        fontFamily: 'Arial',
        displayImages: true,
        lineHeight: 1.5,
        wordSpacing: 0.1
    };

    function Settings() {}

    Settings.prototype.getSettings = function() {
        return new Promise(function(resolve) {
            chrome.storage.sync.get(function(item) {
               if(Object.keys(item).length !== 0) {
                   // object is not empty
                   currentSettings = item;
               }

                resolve(currentSettings);
            });
        });
    };

    Settings.prototype.get = function (name) {
        return currentSettings[name];
    };

    Settings.prototype.set = function (name, value) {
        currentSettings[name] = value;
    };

    Settings.prototype.isSet = function () {
        return Object.keys(currentSettings).length !== 0;
    };

    Settings.prototype.asStyle = function() {
      return "font-size: " + currentSettings.fontSize + "px; " +
          "font-family: " + currentSettings.fontFamily + ";" +
          "line-height: " + currentSettings.lineHeight + "; " +
          "word-spacing: " + currentSettings.wordSpacing + "px; ";
    };

    Settings.prototype.save = function() {
        chrome.storage.sync.set(currentSettings);
    };

    return Settings;

})();