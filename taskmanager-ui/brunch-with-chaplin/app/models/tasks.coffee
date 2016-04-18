Task = require 'models/task'
Collection = require 'models/base/collection'
Chaplin = require 'chaplin'

module.exports = class Tasks extends Collection

  model: Task
  url: 'http://127.0.0.1:8000/api/v1/tasks/'

  initialize: ->
    super
    Chaplin.mediator.subscribe('newTask', @createNewTask)
  
  parse: (data) ->
    data.objects


#  createNewTask: (task) =>
#    newModel = @create(task, {wait: true})
#    console.log Tasks.originalCollection
##    Tasks.originalCollection = newModel.collection
#    Chaplin.mediator.publish('renderCollection')
    
    
  createNewTask: (task) =>
#    test = new Task( {id: 0, status: 'new', title: 'dsad', implementer: {id: 0, name: 'test'} } )
    @create(task)
#    @fetch().success ()=> Chaplin.mediator.publish('renderCollection')


#    @create(task, success: (response)->
#      Tasks.originalCollection = response.collection
#      console.log Tasks.originalCollection)

#    Chaplin.mediator.publish('renderCollection')


#  createNewTask: (task) =>
#    newModel = @create(task, {wait: true})
#    Tasks.originalCollection = newModel.collection
#    Chaplin.mediator.publish('renderCollection')




