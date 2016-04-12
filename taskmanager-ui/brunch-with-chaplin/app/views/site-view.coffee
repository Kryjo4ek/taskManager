View = require 'views/base/view'

# Site view is a top-level view which is bound to body.
module.exports = class SiteView extends View
  container: 'body'
  id: 'site-container'
  regions:
    header: '#header-container'
    main: '#page-container'
    manager: '#manager-container'
    tasks: '#tasks-container'
    modalWindow: '#modal-window-container'
    taskWindow: '.task-window-container'
    setImplementer: '#set-implementer'
    
  template: require './templates/site'
