Implementer= require 'models/implementer'
Collection = require 'models/base/collection'
Chaplin = require 'chaplin'

module.exports = class Implementers extends Collection

  model: Implementer
  url: 'http://127.0.0.1:8000/api/v1/implementers/'
  
  initialize: ->
    super
    Chaplin.mediator.subscribe('newImplementer', @createNewImplementer)
    Implementers.cacheImplementer = @
    
  parse: (data) ->
    data.objects


  createNewImplementer: (implementer) =>
    @create(implementer)

    
