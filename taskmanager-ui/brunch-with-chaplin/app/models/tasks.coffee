Task = require 'models/task'
Collection = require 'models/base/collection'
Chaplin = require 'chaplin'

module.exports = class Tasks extends Collection

  model: Task
  url: 'http://127.0.0.1:8000/api/v1/tasks/'

  initialize: ->
    Chaplin.mediator.subscribe('newTask', @createNewTask)

  parse: (data) ->
    data.objects

  createNewTask: (task) =>
    console.log task
    @create(task)
