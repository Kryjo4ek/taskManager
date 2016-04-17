View = require 'views/base/view'
Template = require 'views/home/templates/task-window'
ImplementersModel = require 'models/implementers'
ImplementersView = require 'views/home/implementers-view'
Chaplin = require 'chaplin'
TasksModel = require 'models/tasks'

module.exports = class TaskWindowView extends View

  template: Template
  autoRender: true
  className : "modal-window"
  events:
    'click #close-button' : 'removeWindow'
    'click #save-task-button' : 'saveTask'
#    'mouseenter .menu-option-status' : 'showWindowStatus'
#    'mouseleave .menu-option-status' : 'hideWindowStatus'
    'click .option-status' : 'saveFilterStatus'
    'click .implementer' : 'saveSelectImplementer'

  removeWindow: ->
    @remove()

  saveTask: ->
    task = {
      title: $('#title').val()
      status: @$('.option-status-top').text()
      implementer: ImplementersModel.cacheImplementer._byId[$('.implementer-top').attr('value')]
    }

    return unless @validate(task)
    Chaplin.mediator.publish 'newTask', task
    Chaplin.mediator.publish('renderCollection')
    @removeWindow()

  saveFilterStatus: (event) ->
    @$('.option-status-top').text(event.target.textContent)

  saveSelectImplementer: ->
    @$('.implementer-top').text(event.target.textContent)
#    @atr = event.target.attributes.value
#    console.log event.target.attributes.value.value
    @$('.implementer-top').attr('value', event.target.attributes.value.value)





  validate: (task) ->
    valid = true

    if !(/^[A-Z][a-z\s\d]{3,20}$/.test(task.title))
      valid = false
      @$('.valid').text('Error: Edit title')
    if @$('.implementer-top').text() == 'Select implementer'
      valid = false
      @$('.valid').text('Error: Edit implementer')
    return valid

  getTemplateData: ->
    ImplementersModel.cacheImplementer.models
    


    
