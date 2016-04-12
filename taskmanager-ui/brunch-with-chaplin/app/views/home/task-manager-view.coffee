View = require 'views/base/view'
Template = require 'views/home/templates/task-manager'
TasksView = require 'views/home/tasks-view'
TaskWindowView = require 'views/home/task-window-view'
Tasks = require 'models/tasks'


module.exports = class TaskManagerView extends View

  template: Template
  autoRender: true
  events:
    'click .addtask-button' : 'showWindowTask'
    'click .addimplementer-button' : 'addImplementer'
    

  showWindowTask: ->

    @taskWindowView = new TaskWindowView region: 'modalWindow'
#    @addTask(@createTask)
#    console.log('showWindowTask')


#  createTask: (task) =>
#    TasksView.collection.createNewTask(task)
#  createTask: (task) ->
#    Tasks.createNewTask(task)
#  createTask: (task) ->
#    @subviewsByName['tasks'].collection.createNewTask(task)
#  createTask: (task) ->
#    Tasks.a()
#    @Tasks.createNewTask(task)


#  addTask:(callback) ->
#
#    console.log('addTask create')
#    @taskWindowView = new TaskWindowView region: 'modalWindow', callback: callback


  
  
    
  addImplementer: ->
    console.log('addimplementer')


