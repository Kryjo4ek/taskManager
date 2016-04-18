CollectionView = require 'views/base/collection-view'
TaskView = require 'views/home/task-view'
TasksModel = require 'models/tasks'
Chaplin = require 'chaplin'

module.exports = class TasksView extends CollectionView

  itemView: TaskView
  tagName: 'div'
  className: 'tasks'

  initialize: ->
    Chaplin.mediator.subscribe('saveStatus', @filterStatus)
    Chaplin.mediator.subscribe('renderCollection', @renderCollection)
    
  filterStatus: (status) =>
    if status.status == "All status"
      @collection.reset(TasksModel.originalCollection)
      @renderCollection()

    else
      @collection.reset(TasksModel.originalCollection)
      @collection.reset(@collection.where(status))
      @render()
      

  renderCollection: =>
#    @collection = TasksModel.originalCollection
    @render()