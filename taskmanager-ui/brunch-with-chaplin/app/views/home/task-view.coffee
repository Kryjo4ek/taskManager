View = require 'views/base/view'
Template = require 'views/home/templates/task'
Chaplin = require 'chaplin'


module.exports = class TaskView extends View

  template: Template
  className: 'task'
  tagName: "div"
  events:
    'click .delete-task': 'checkTask'

  initialize: ->
    @marked = true

  checkTask:->
    @marked = !@marked
    
    if @marked
      Chaplin.mediator.unsubscribe 'deleteMarked', @deleteTask

    else
      Chaplin.mediator.subscribe 'deleteMarked', @deleteTask

  deleteTask: =>
    Chaplin.mediator.unsubscribe 'deleteMarked', @deleteTask
    @model.destroy()
    @remove()

