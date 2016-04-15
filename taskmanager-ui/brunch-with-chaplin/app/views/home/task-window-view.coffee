View = require 'views/base/view'
Template = require 'views/home/templates/task-window'
ImplementersModel = require 'models/implementers'
ImplementersView = require 'views/home/implementers-view'
Chaplin = require 'chaplin'

module.exports = class TaskWindowView extends View

  template: Template
  autoRender: true
  className : "modal-window"
  events:
    'click #save-task-button' : 'saveTask'
    'click #close-button' : 'removeWindow'
#    'click .select-implementer-button' : 'selectImplementer'
#    'change input' : ()-> console.log('!')
#    'click .select-implementer-button' : 'selectImplementer'

  removeWindow: ->
    @remove()
    console.log ('delete')

  saveTask: ->
    task = {
      title: $('#title').val()
      status: $('#status').val()
      implementer: ImplementersModel.cacheImplementer._byId[$('#implementer option:selected').prop('value')]
    }
    return unless @validate(task)
    Chaplin.mediator.publish 'newTask', task
    @removeWindow()

  validate: (task) ->
    valid = false

    if (/^[A-Z][a-z\s]{3,20}$/.test(task.title))
      valid = true
    else
      @$('#title').css('border', '1px solid red')

    return valid

  getTemplateData: ->
    ImplementersModel.cacheImplementer.models


    
