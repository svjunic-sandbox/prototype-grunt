((window, document, $) ->

  "use strict"
  
  window.= window.MOGETA || {}
  window.MOGETA.GLOBAL = window.MOGETA.GLOBAL || {}

  class window.MOGETA.GLOBAL.Menu
    # Static variables
    @el = $('#global-nav')
    
    # fields
    _status = ''
    
    # constructor
    constructor: (args)->
      return
    
    # private methods
    changeShowMode = (args)->
      return
    
    # public methods
    update: (args)->
      if args
        changeShowMode.call @, args
    
    # getter/setter
    @property 'mode',
      get: -> @_mode
      set: (foo) -> @_mode = mode



  class window.MOGETA.GLOBAL.Menu2 extends mogeta
    constructor: ( args )->
      return



) window, document, jQuery


