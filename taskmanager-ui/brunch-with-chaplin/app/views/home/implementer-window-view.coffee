View = require 'views/base/view'
Template = require 'views/home/templates/implementer-window'
Chaplin = require 'chaplin'

module.exports = class ImplementerWindowView extends View

  template: Template
  autoRender: true
  className : "modal-window"
  events:
    'click .save-implementer-button' : 'saveImplementer'
    'click .close-button' : 'removeWindow'

  saveImplementer: () ->
    implementer = {
      name: $('.name-implementer').val()
    }
    return unless @validate(implementer)
    Chaplin.mediator.publish 'newImplementer', implementer
    @remove()

  validate: (implementer)->
    valid = false

    if /^[A-Z][a-z\s]{2,10}$/.test(implementer.name)
      valid = true
    else
      @$('.name-implementer').css('border', '1px solid red')

    return valid
    
  removeWindow: ->
    console.log 'removeWindow'
    @remove()