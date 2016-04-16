View = require 'views/base/view'
Template = require 'views/home/templates/task-manager'
TasksView = require 'views/home/tasks-view'
TaskWindowView = require 'views/home/task-window-view'
ImplementerWindowView= require 'views/home/implementer-window-view'
FilterStatusWindowView= require 'views/home/status-filter-window-view'
Tasks = require 'models/tasks'
TasksView =  require 'views/home/tasks-view'
Chaplin = require 'chaplin'


module.exports = class TaskManagerView extends View

  template: Template
  autoRender: true
  className: 'header-task'
  events:
    'click #add-task' : 'showWindowTask'
    'click #add-implementer' : 'showWindowImplementer'
    'click #delete-check-tasks' : 'deleteCheckTasks'
#    'click #filter-status-button"' : 'showFilterStatusWindow'

  showWindowTask: ->
    console.log 'srabotalo'
    @taskWindowView = new TaskWindowView region: 'modalWindow'

  showWindowImplementer: ->
    @implementerWindowView = new ImplementerWindowView region:'modalWindow'

  deleteCheckTasks: ->
    Chaplin.mediator.publish 'deleteMarked'

#  showFilterStatusWindow: ->
#    @filterStatusWindow = new FilterStatusWindowView region: 'modalWindow'
#  getTemplateData: ->
#    TasksView.cacheImplementer.models




