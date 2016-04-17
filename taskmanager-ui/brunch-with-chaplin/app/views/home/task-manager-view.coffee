View = require 'views/base/view'
Template = require 'views/home/templates/task-manager'
TasksView = require 'views/home/tasks-view'
TaskWindowView = require 'views/home/task-window-view'
ImplementerWindowView= require 'views/home/implementer-window-view'
TasksModel = require 'models/tasks'
Chaplin = require 'chaplin'


module.exports = class TaskManagerView extends View

  template: Template
  autoRender: true
  className: 'header-task'
  events:
    'click #add-task' : 'showWindowTask'
    'click #add-implementer' : 'showWindowImplementer'
    'click #delete-check-tasks' : 'deleteCheckTasks'
    'mouseenter .menu-option-status' : 'showWindowStatus'
    'mouseleave .menu-option-status' : 'hideWindowStatus'
    'click .option-status' : 'saveFilterStatus'


  showWindowTask: ->
    @taskWindowView = new TaskWindowView region: 'modalWindow'

  showWindowImplementer: ->
    @implementerWindowView = new ImplementerWindowView region:'modalWindow'

  deleteCheckTasks: ->
    Chaplin.mediator.publish 'deleteMarked'
    Chaplin.mediator.publish 'renderCollection'

  showWindowStatus: ->
    @menuOpionStatus ?= @$('.menu-option-status')
    @propertyButtonStatus ?= @$('.property-button-status')

    @menuOpionStatus.css('height', '550')
    @menuOpionStatus.css('background', '#263748')
    @menuOpionStatus.css('border-left', '1px solid #3598DC')
    @menuOpionStatus.css('border-right', '1px solid #3598DC')
    @menuOpionStatus.css('border-bottom', '1px solid #3598DC')
#    @propertyButtonStatus.css('background', '#263748  ')

  hideWindowStatus: ->
    @menuOpionStatus.css('height', '50')
    @menuOpionStatus.css('background', '#3598DC')

#    @propertyButtonStatus.css('background', '#3598DC')


  saveFilterStatus: (event) ->
    status = {status : event.target.textContent}
    @$('.option-status-top').text(event.target.textContent)
    Chaplin.mediator.publish 'saveStatus', status
    @hideWindowStatus()
    






