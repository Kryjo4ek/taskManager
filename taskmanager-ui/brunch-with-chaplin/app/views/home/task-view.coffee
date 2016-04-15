View = require 'views/base/view'
TaskModel = require 'models/task'
Template = require 'views/home/templates/task'
Chaplin = require 'chaplin'


module.exports = class TaskView extends View

  template: Template

  className: 'task'
  tagName: "tr"
  events:
    'click .delete-task': 'checkTask'

  initialize: ->
    @marked = true

  checkTask:->
    @marked = !@marked
    if @marked
      console.log '@marked'
      Chaplin.mediator.unsubscribe 'deleteMarked', @deleteTask

    else
      Chaplin.mediator.subscribe 'deleteMarked', @deleteTask


#  checkTask:->
#    if @$('.delete-task').prop('checked')
#      Chaplin.mediator.subscribe 'deleteMarked', @deleteTask
#    else
#      Chaplin.mediator.unsubscribe 'deleteMarked', @deleteTask

  deleteTask:=>
    console.log 'deleteTask'
    @model.destroy()
