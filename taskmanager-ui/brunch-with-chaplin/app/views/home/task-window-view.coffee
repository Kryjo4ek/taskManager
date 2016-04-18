View = require 'views/base/view'
Template = require 'views/home/templates/task-window'
ImplementersModel = require 'models/implementers'
Chaplin = require 'chaplin'

module.exports = class TaskWindowView extends View

  template: Template
  autoRender: true
  className : "modal-window"
  events:
    'click #close-button' : 'removeWindow'
    'click #save-task-button' : 'saveTask'
    'input .event-valid' : 'validate'
    'mouseleave .event-valid' : 'validate'
    'click #option-status' : 'saveFilterStatus'
    'click #implementer' : 'saveSelectImplementer'

  removeWindow: ->
    @remove()

  saveTask: ->
    task = {
      title: $('#title').val()
      status: @$('#status-top').text()
      implementer: ImplementersModel.cacheImplementer._byId[$('#implementer-top').attr('value')]
    }

    return unless @validate(task)
    Chaplin.mediator.publish 'newTask', task
    Chaplin.mediator.publish('renderCollection')
    @removeWindow()

  saveFilterStatus: (event) ->
    @$('#status-top').text(event.target.textContent)

  saveSelectImplementer: ->
    @$('#implementer-top').text(event.target.textContent)
    @$('#implementer-top').attr('value', event.target.attributes.value.value)

  validate: ->
    valid = true
    str = ''
    if !(/^[A-Z][a-z\s\d]{3,20}$/.test($('#title').val()))
      valid = false
      str = 'Error: Edit title'
      @$('.valid').css('Error: Edit title')

    if @$('#implementer-top').text() == 'Select implementer'
      valid = false
      str = str + '\n' + 'Error: Edit implementer'

    @$('.valid').text(str)

    if str == ''
      @$('.valid').text('All rows in the order')
    return valid

  getTemplateData: ->
    ImplementersModel.cacheImplementer.models
    


    
