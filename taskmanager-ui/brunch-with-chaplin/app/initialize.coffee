Application = require 'application'
routes = require 'routes'

# Initialize the application on DOM ready event.
$ ->
  new Application {
    title: 'Task manager',
    controllerSuffix: '-controller',
    routes
  }
