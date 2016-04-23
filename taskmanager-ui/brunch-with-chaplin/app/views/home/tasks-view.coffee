CollectionView = require 'views/base/collection-view'
TaskView = require 'views/home/task-view'
Chaplin = require 'chaplin'


module.exports = class TasksView extends CollectionView

  itemView: TaskView
  tagName: 'div'
  className: 'tasks'

  initialize: ->
    Chaplin.mediator.subscribe('saveStatus', @filterStatus)
    Chaplin.mediator.subscribe('renderCollection', @renderCollection)

  filterStatus: (status) =>
    for view in @subviews
      if status.status == "All status"
        view.$el.show()

      else if view.model.attributes.status == status.status
        view.$el.show()

      else
        view.$el.hide()

  renderCollection: =>
    @render()