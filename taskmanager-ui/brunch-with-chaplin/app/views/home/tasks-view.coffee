CollectionView = require 'views/base/collection-view'
TaskView = require 'views/home/task-view'
TasksModel = require 'models/tasks'
TaskModel = require 'models/task'
Chaplin = require 'chaplin'




module.exports = class TasksView extends CollectionView

  itemView: TaskView
  tagName: 'div'
  className: 'tasks'

  initialize: ->
    Chaplin.mediator.subscribe('saveStatus', @filterStatus)
    Chaplin.mediator.subscribe('renderCollection', @renderCollection)


  filterStatus: (status) =>
    console.log status.status
    if status.status == "All status"
      @collection.reset(TasksModel.originalCollection)
      @render()

    else
      @collection.reset(TasksModel.originalCollection)
      @collection.reset(@collection.where(status))
      @render()

  renderCollection: =>
    @render()