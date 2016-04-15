Task = require 'models/task'
Collection = require 'models/base/collection'
Chaplin = require 'chaplin'

module.exports = class Tasks extends Collection

  model: Task
  url: 'http://127.0.0.1:8000/api/v1/tasks/'

  initialize: ->
    Chaplin.mediator.subscribe('newTask', @createNewTask)
#    Chaplin.mediator.subscribe('searchCheckTasks', @searchCheckTasks)
#    Chaplin.mediator.subscribe('deleteCollection', @deleteAllTasks)
  parse: (data) ->
    data.objects

#  searchCheckTasks: =>
#    checkTasks = $('tr').has('.proverka')
#    console.log checkTasks
##    console.log @model
    
  createNewTask: (task) =>
    console.log 'ata'
    console.log task
    @create(task)

#  deleteAllTasks: ()=>
#    console.log @
##    @reset()