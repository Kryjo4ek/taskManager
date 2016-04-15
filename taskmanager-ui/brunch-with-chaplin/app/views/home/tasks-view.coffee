CollectionView = require 'views/base/collection-view'
Template = require 'views/home/templates/tasks'
TaskView = require 'views/home/task-view'





module.exports = class TasksView extends CollectionView

  itemView: TaskView
  tagName: "table"
  className: 'tasks'
#
#  events:
#    'click .property-task': 'deleteTask'
#
#
#  deleteTask: ->
#    console.log 'deleteTask'
#    @model.destroy()






