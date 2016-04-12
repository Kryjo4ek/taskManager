View = require 'views/base/view'
Template = require 'views/home/templates/task'


module.exports = class TaskView extends View
  template: Template
#  autoRender: false

#  initialize: ->
#    @context =
#      title : @model.attributes.title
#      status : @model.attributes.status
#      implementers : @model.attributes.implementer.name
#    console.log(@context)

#  getTemplateData: ->
#    @context
  


