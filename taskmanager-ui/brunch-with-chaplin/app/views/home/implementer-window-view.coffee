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
    return unless @validate(implementer)
    Chaplin.mediator.publish 'newImplementer', implementer
    @remove()

  validate: ->
    valid = true

    if !/^[A-Z][a-z\s]{2,10}$/.test($('.name-implementer').val())
      valid = false
#      @$('.name-implementer').css('border', '1px solid red')
      @$('.valid').text('Error: input good name')
    else
      @$('.valid').text('Good Name!')

    return valid
    
  removeWindow: ->
    console.log 'removeWindow'
    @remove()