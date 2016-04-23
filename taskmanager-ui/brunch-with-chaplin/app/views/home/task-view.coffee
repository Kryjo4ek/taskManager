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
      console.log @marked + " "
      console.log @model
      Chaplin.mediator.unsubscribe 'deleteMarked', @deleteTask

    else
      console.log "else" + @marked
      console.log @model
      Chaplin.mediator.subscribe 'deleteMarked', @deleteTask

  deleteTask: =>
    Chaplin.mediator.unsubscribe 'deleteMarked', @deleteTask
    @model.destroy()
    @remove()