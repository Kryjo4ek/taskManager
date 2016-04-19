Implementer= require 'models/implementer'
Collection = require 'models/base/collection'
Chaplin = require 'chaplin'

module.exports = class Implementers extends Collection

  model: Implementer
  url: 'http://78.47.87.66/api/v1/implementers/'
  
  initialize: ->
    super
    Chaplin.mediator.subscribe('newImplementer', @createNewImplementer)
    Implementers.cacheImplementer = @

    
  parse: (data) ->
    data.objects


  createNewImplementer: (implementer) =>
    implementerModel = @create(implementer, {wait: true})
    Implementers.cacheImplementer.push(implementerModel)
    



    
