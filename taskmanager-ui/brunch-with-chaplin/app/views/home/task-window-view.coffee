View = require 'views/base/view'
Template = require 'views/home/templates/task-window'
ImplementersModel = require 'models/implementers'
ImplementersView = require 'views/home/implementers-view'
Chaplin = require 'chaplin'

module.exports = class TaskWindowView extends View

  template: Template
  autoRender: true
  events:
    'click #save-task-button' : 'saveTask'
    'click #close-button' : 'removeWindow'
    'change input' : ()-> console.log('!')
#    'click .select-implementer-button' : 'selectImplementer'

  initialize: (options)->
    super
    @callback = options.callback

  removeWindow: ->
    @remove()
    console.log ('delete')

  saveTask: ->
    task = {
      title: $('#title').val()
      status: $('#status').val()
      implementer: ImplementersModel.cacheImplementer._byId[$('#implementer option:selected').prop('value')]
    }
    return unless @validate(task)
    Chaplin.mediator.publish 'newTask', task
    @removeWindow()


  validate: (task) ->
    valid = true

    if task.title != /^[A-Z][a-z]{3,}$/
      valid = false
      @$('#title').css('border', '1px solid red')

    return valid

  getTemplateData: ->
    ImplementersModel.cacheImplementer.models


#  selectImplementer: ->
#    console.log('asdf')
#    @collectionImplementer = new ImplementersModel
#    @collectionImplementerView = new ImplementersView collection: @collectionImplementer, region: 'setImplementer'
#    @collectionImplementer.fetch().success @collectionImplementerView.render
    
