var nextBtn = document.querySelector('#nextStep'),
    prevBtn = document.querySelector('#prevStep');

var Settings = (function () {
    var currentSettings = {
        fontSize: 16,
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

var Steps = (function () {
    var steps = [];

    function Steps() {
    }

    function makeElementVisible(elem) {
        if (elem !== undefined) {
            elem.elem.style.display = 'block';
            if (elem.bullet !== undefined) {
                elem.bullet.className = 'active';
            }
        }
    }

    function hideElement(elem) {
        if (elem !== undefined) {
            elem.elem.style.display = 'none';
            if (elem.bullet !== undefined) {
                elem.bullet.className = '';
            }
        }
    }

    function numberOfBullets() {
        return steps.filter(function (item) {
            return item.bullet !== undefined;
        }).length;
    }

    function displayOrHideArrows(step) {
        if (numberOfBullets() === 0) {
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-block';
            prevBtn.style.display = 'inline-block';

            if (step >= numberOfBullets()) {
                nextBtn.style.display = 'none';
            } else if (step <= steps.length - numberOfBullets()) {
                prevBtn.style.display = 'none';
            }
        }
    }

    Steps.prototype.add = function (elem) {
        steps.push(elem);
    };

    Steps.prototype.get = function (stepNumber) {
        return steps.find(function (item) {
            return item.step === stepNumber;
        })
    };

    Steps.prototype.next = function (step) {
        hideElement(this.get(step));
        makeElementVisible(this.get(step + 1));
        displayOrHideArrows(step + 1);
    };

    Steps.prototype.prev = function (step) {
        hideElement(this.get(step));
        makeElementVisible(this.get(step - 1));
        displayOrHideArrows(step - 1);
    };

    return Steps;
})();

var Pagination = (function () {

    var currentPage = 0,
        steps = new Steps();

    function Pagination() {
        collectAllSteps();

        //make first step visible
        var startStep = steps.get(0);
        if (startStep === undefined) {
            //throw an error
            throw "Invalid step number";
        }
        startStep.elem.style.display = 'block';
    }

    function collectAllSteps() {
        var bullets = [];
        document.querySelectorAll("[data-type=bullet]").forEach(function (item) {
            bullets[parseInt(item.getAttribute('data-step'))] = item;
        });
        document.querySelectorAll("[data-type=step]").forEach(function (item) {
            steps.add({
                step: parseInt(item.getAttribute('data-step')),
                elem: item,
                bullet: bullets[parseInt(item.getAttribute('data-step'))]
            });
        });
    }

    Pagination.prototype.next = function (callback) {
        steps.next(currentPage);
        currentPage++;
    };

    Pagination.prototype.prev = function () {
        steps.prev(currentPage);
        currentPage--;
    };

    return Pagination;
})();

var pag = new Pagination(),
    settings = new Settings(),
    previewText = document.querySelector('#previewText'),
    previewFontFamily = document.getElementById('previewFontFamily');

function applySettingsToText() {
    document.querySelectorAll('.previewText').forEach(function (item) {
        item.setAttribute('style', settings.asStyle());
    });
}
settings.getSettings().then(function() {
    document.querySelector('#startBtn').addEventListener('click', function () {
        applySettingsToText();
        pag.next();
    });

    prevBtn.addEventListener('click', function () {
        applySettingsToText();
        pag.prev();
    });

    nextBtn.addEventListener('click', function () {
        applySettingsToText();
        pag.next();
    });

    document.querySelector('#plusBtn').addEventListener('click', function () {
        settings.set('fontSize', settings.get('fontSize') + 1);
        previewText.style.fontSize = (settings.get('fontSize')) + "px";
    });

    document.querySelector('#minusBtn').addEventListener('click', function () {
        settings.set('fontSize', settings.get('fontSize') - 1);
        previewText.style.fontSize = (settings.get('fontSize')) + "px";
    });

    document.getElementById('fontFamilySelector').addEventListener('change', function (ev) {
        settings.set('fontFamily', ev.target.value);
        previewFontFamily.style.fontFamily = settings.get('fontFamily');
    });

    document.getElementById('displayImages').addEventListener('click', function (ev) {
        settings.set('displayImages', true);
        document.querySelector("[data-step='3']").querySelectorAll("img").forEach(function (item) {
            item.style.display = 'inline-block';
        });
    });

    document.getElementById('hideImages').addEventListener('click', function (ev) {
        settings.set('displayImages', false);
        document.querySelector("[data-step='3']").querySelectorAll("img").forEach(function (item) {
            item.style.display = 'none';
        });
    });

    document.getElementById('linePlus').addEventListener('click', function() {
        settings.set('lineHeight', settings.get('lineHeight') + 0.1);
        document.querySelector("[data-step='4']").querySelector('p').style.lineHeight = settings.get('lineHeight');
    });

    document.getElementById('lineMinus').addEventListener('click', function() {
        settings.set('lineHeight', settings.get('lineHeight') - 0.1);
        document.querySelector("[data-step='4']").querySelector('p').style.lineHeight = settings.get('lineHeight');
    });

    document.getElementById('wordPlus').addEventListener('click', function() {
        settings.set('wordSpacing', settings.get('wordSpacing') + 1);
        document.querySelector("[data-step='5']").querySelector('p').style.wordSpacing = settings.get('wordSpacing') + "px";
    });

    document.getElementById('wordMinus').addEventListener('click', function() {
        settings.set('wordSpacing', settings.get('wordSpacing') - 1);
        document.querySelector("[data-step='5']").querySelector('p').style.wordSpacing = settings.get('wordSpacing') + "px";
    });

    document.getElementById('finishConfig').addEventListener('click', function(){
        settings.save();
        window.close();
    });
});