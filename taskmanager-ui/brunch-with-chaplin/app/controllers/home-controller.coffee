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


module.exports = class HomeController extends Controller
  beforeAction: ->
    super
    @reuse 'header', HeaderView, region: 'header'

  index: ->

    @managerView = new TaskManagerView region: 'main'
    @collection = new TasksModel
    @collectionView = new TasksView collection: @collection, region: 'main'
    @collection.fetch().success @collectionView.render

# change

    @collectionImplementer = new ImplementersModel
    console.log (ImplementersModel.cacheImplementer)

    @collectionImplementer.fetch().success ()-> console.log (ImplementersModel.cacheImplementer)


#    @modalWindowView = new TaskWindowView region: 'testRegion'
  