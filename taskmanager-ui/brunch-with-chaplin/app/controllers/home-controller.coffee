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
    @collection.fetch().success @collectionView.render
    @collectionImplementer = new ImplementersModel
    @collectionImplementer.fetch()