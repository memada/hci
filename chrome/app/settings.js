var Settings = (function() {
  var currentSettings = {};

  function Settings() {
    chrome.storage.sync.get(function (settings) {
      currentSettings = settings;
    });
  }

  Settings.prototype.isSet = function() {
    return Object.keys(currentSettings).length !== 0;
  };

  return Settings;

})();

var Steps = (function() {
  var steps = [];
  function Steps() {}

  function makeElementVisible(elem) {
    if(elem !== undefined) {
      elem.elem.style.display = 'block';
      if (elem.bullet !== undefined) {
        elem.bullet.style.background = '#3c3c3c';
      }
    }
  }

  function hideElement(elem) {
    if(elem !== undefined) {
      elem.elem.style.display = 'none';
      if (elem.bullet !== undefined) {
        elem.bullet.style.background = 'white';
      }
    }
  }

  Steps.prototype.add = function(elem) {
    steps.push(elem);
  };

  Steps.prototype.get = function(stepNumber) {
    return steps.find(function(item) {
      return item.step === stepNumber;
    })
  };

  Steps.prototype.next = function(step) {
    hideElement(this.get(step));
    makeElementVisible(this.get(step + 1));
  };

  Steps.prototype.prev = function(step) {
    hideElement(this.get(step));
    makeElementVisible(this.get(step - 1));
  };

  return Steps;
})();

var Pagination = (function() {

  var currentPage = 0,
      steps = new Steps();

  function Pagination() {
    collectAllSteps();

    //make first step visible
    var startStep = steps.get(0);
    if(startStep === undefined) {
      //throw an error
      throw "Invalid step number";
    }
    startStep.elem.style.display = 'block';
  }

  function collectAllSteps() {
    var bullets = [];
    document.querySelectorAll("[data-type=bullet]").forEach(function(item) {
      bullets[parseInt(item.getAttribute('data-step'))] = item;
    });
    document.querySelectorAll("[data-type=step]").forEach(function(item){
      steps.add({
        step: parseInt(item.getAttribute('data-step')),
        elem: item,
        bullet: bullets[parseInt(item.getAttribute('data-step'))]
      });
    });
  }

  Pagination.prototype.next = function(callback) {
    steps.next(currentPage);
    currentPage++;
  };

  Pagination.prototype.prev = function() {
    steps.prev(currentPage);
    currentPage--;
  };

  return Pagination;
})();

var pag = new Pagination();

document.querySelector('#startBtn').addEventListener('click', function() {
  pag.next();
});