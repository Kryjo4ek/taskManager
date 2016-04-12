Implementer= require 'models/implementer'
Collection = require 'models/base/collection'

module.exports = class Implementers extends Collection

  model: Implementer
  url: 'http://127.0.0.1:8000/api/v1/implementers/'
  
  initialize: ->
    super
    Implementers.cacheImplementer = @
    
  parse: (data) ->

    data.objects



    
