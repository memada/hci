class ChromeStorage
class FirefoxStorage

class StorageFactory
  @getInstance: (name) ->
    if name is 'Chrome'
      new ChromeStorage()
    else
      new FirefoxStorage()


class Extension
  constructor: (storage) ->


new Extension(null)