Task = require 'models/task'
Collection = require 'models/base/collection'
Chaplin = require 'chaplin'


module.exports = class Tasks extends Collection

  model: Task
  url: '/api/v1/tasks/'

  initialize: ->
    super
    Chaplin.mediator.subscribe('newTask', @createNewTask)

  parse: (data) ->
    data.objects

  createNewTask: (task) =>
    @create(task)