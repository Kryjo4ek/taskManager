Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
HomePageView = require 'views/home/home-page-view'
TaskModel = require 'models/task'
TasksModel = require 'models/tasks'
TaskView = require 'views/home/task-view'
TasksView = require 'views/home/tasks-view'
TaskManagerView = require 'views/home/task-manager-view'
TaskWindowView = require 'views/home/task-window-view'
ImplementersModel = require 'models/implementers'
FilterStatusWindowView= require 'views/home/status-filter-window-view'

module.exports = class HomeController extends Controller
  beforeAction: ->
    super
    @reuse 'header', HeaderView, region: 'header'

  index: ->

    @managerView = new TaskManagerView region: 'columnNameContainer'
    @collection = new TasksModel
    @collectionView = new TasksView collection: @collection, region: 'tasks'
    @collection.fetch().success @collectionView.render
    @collectionImplementer = new ImplementersModel
    console.log (ImplementersModel.cacheImplementer)
    @collectionImplementer.fetch().success ()-> console.log (ImplementersModel.cacheImplementer)

#testkeys
#  index: ->
#    httpRequest = new XMLHttpRequest()
#    httpRequest.open('DELETE', 'http://127.0.0.1:8000/api/v1/tasks/')
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
