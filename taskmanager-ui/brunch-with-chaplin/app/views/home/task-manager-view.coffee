View = require 'views/base/view'
Template = require 'views/home/templates/task-manager'
TasksView = require 'views/home/tasks-view'
TaskWindowView = require 'views/home/task-window-view'
ImplementerWindowView= require 'views/home/implementer-window-view'
FilterStatusWindowView= require 'views/home/status-filter-window-view'
Tasks = require 'models/tasks'
Chaplin = require 'chaplin'


module.exports = class TaskManagerView extends View

  template: Template
  autoRender: true
  className: 'header-task'
  events:
    'click .addtask-button' : 'showWindowTask'
    'click .addimplementer-button' : 'showWindowImplementer'
    'click .delete-all-tasks' : 'deleteCheckTasks'
#    'click .filter-status-button' : 'showFilterStatusWindow'

  showWindowTask: ->
    @taskWindowView = new TaskWindowView region: 'modalWindow'

  showWindowImplementer: ->
    @implementerWindowView = new ImplementerWindowView region:'modalWindow'

  deleteCheckTasks: ->
    Chaplin.mediator.publish 'deleteMarked'

#  showFilterStatusWindow: ->
#    @filterStatusWindow = new FilterStatusWindowView region: 'modalWindow'





