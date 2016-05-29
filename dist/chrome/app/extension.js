var ChromeStorage, Extension, FirefoxStorage, StorageFactory;

ChromeStorage = (function() {
  function ChromeStorage() {}

  return ChromeStorage;

})();

FirefoxStorage = (function() {
  function FirefoxStorage() {}

  return FirefoxStorage;

})();

StorageFactory = (function() {
  function StorageFactory() {}

  StorageFactory.getInstance = function(name) {
    if (name === 'Chrome') {
      return new ChromeStorage();
    } else {
      return new FirefoxStorage();
    }
  };

  return StorageFactory;

})();

Extension = (function() {
  function Extension(storage) {}

  return Extension;

})();

new Extension(null);
