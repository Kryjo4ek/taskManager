View = require 'views/base/view'
TaskModel = require 'models/task'
TasksModel = require 'models/tasks'
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
      console.log '@marked'
      Chaplin.mediator.unsubscribe 'deleteMarked', @deleteTask

    else
      Chaplin.mediator.subscribe 'deleteMarked', @deleteTask

  deleteTask: =>
#    console.log 'deleteTask'
#    console.log @model
#    @collect = new TasksModel
#    @collect.fetch()
#    @collect.originalCollection
#    console.log @collect.originalCollection
    @model.destroy()
