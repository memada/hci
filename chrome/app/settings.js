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

  Steps.prototype.add = function(elem) {
    steps.push(elem);
  };

  Steps.prototype.get = function(stepNumber) {
    return steps.find(function(item) {
      return item.step === stepNumber;
    })
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
    document.querySelectorAll("[data-type=step]").forEach(function(item){
      steps.add({
        step: parseInt(item.getAttribute('data-step')),
        elem: item
      });
    });
  }

  Pagination.prototype.next = function(callback) {
    steps.get(currentPage).elem.style.display = 'none';
    steps.get(++currentPage).elem.style.display = 'block';
  };

  return Pagination;
})();

var pag = new Pagination();

document.querySelector('#startBtn').addEventListener('click', function() {
  pag.next();
});