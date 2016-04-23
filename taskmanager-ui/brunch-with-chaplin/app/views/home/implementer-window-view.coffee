View = require 'views/base/view'
Template = require 'views/home/templates/implementer-window'
Chaplin = require 'chaplin'


module.exports = class ImplementerWindowView extends View

  template: Template
  autoRender: true
  className : "modal-window"
  events:
    'click #save-implementer-button' : 'saveImplementer'
    'click #close-button' : 'removeWindow'
    'input .name-implementer' : 'validate'

  saveImplementer: () ->
    implementer = {
      name: $('.name-implementer').val()
    }
    return unless @validate()
    Chaplin.mediator.publish 'newImplementer', implementer
    @remove()

  validate: ->
    valid = true
    
    if !/^[A-Z][a-z\s]{2,7}$/.test($('.name-implementer').val())
      valid = false
      @$('.valid').text('Error: input good name')
      
    else
      @$('.valid').text('Good the name!')
      
    return valid
    
  removeWindow: ->
    @remove()