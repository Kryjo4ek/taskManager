Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
TasksModel = require 'models/tasks'
TasksView = require 'views/home/tasks-view'
TaskManagerView = require 'views/home/task-manager-view'
ImplementersModel = require 'models/implementers'


module.exports = class HomeController extends Controller
  beforeAction: ->
    super
    @reuse 'header', HeaderView, region: 'header'

  index: ->

    @managerView = new TaskManagerView region: 'columnNameContainer'
    @collection = new TasksModel
    @collectionView = new TasksView collection: @collection, region: 'tasks'
    @collection.fetch().success ()=>
      @collectionView.render()
      TasksModel.originalCollection = @collection.models
      
    @collectionImplementer = new ImplementersModel
    @collectionImplementer.fetch().success console.log (ImplementersModel.cacheImplementer)



#    class Collection
#
#      success: (callback) ->
#        @callbackOnSuccess = callback
#
#      fail: (callback) ->
#        @callbackOnFails = callback
#
#      fetch: ->
#        sendRequest()
#        result = waitForRequest()
#
#        if result == 'success' then @callbackOnSuccess?() else @callbackOnFail?()
#
#        return @



#    console.log TasksModel.originalCollection
#()-> TasksModel.originalCollection = @collection.clone()

#@collection.fetch().success TasksModel.originalCollection = @collection.clone @collectionView.render
#testkeys
#  index: ->
#    httpRequest = new XMLHttpRequest()
#    httpRequest.open('DELETE', 'http://127.0.0.1:8000/api/v1/tasks/')
#    httpRequest.send()
#    httpRequest = new XMLHttpRequest()
#    httpRequest.open('DELETE', 'http://127.0.0.1:8000/api/v1/implementers/')
#    httpRequest.send()
#    console.log @collection
#    @collection = new TasksModel
#
#    @collection.fetch().success test
#    test:  =>
#      console.log @collection
#      @collection.create(
#        {
#          title: 'Killhim'
#          status: 'closed'
#          implementer: {name: 'Abram'}
#        }
#      )
#      console.log @collection.models
#      @collection.last().destroy()
#      console.log @collection.models
