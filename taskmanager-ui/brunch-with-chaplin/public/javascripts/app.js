(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("application", function(exports, require, module) {
var Application, Chaplin,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Application = (function(superClass) {
  extend(Application, superClass);

  function Application() {
    return Application.__super__.constructor.apply(this, arguments);
  }

  return Application;

})(Chaplin.Application);
});

;require.register("controllers/base/controller", function(exports, require, module) {
var Chaplin, Controller, SiteView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

SiteView = require('views/site-view');

module.exports = Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.beforeAction = function() {
    return this.reuse('site', SiteView);
  };

  return Controller;

})(Chaplin.Controller);
});

;require.register("controllers/home-controller", function(exports, require, module) {
var Controller, HeaderView, HomeController, ImplementersModel, TaskManagerView, TasksModel, TasksView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Controller = require('controllers/base/controller');

HeaderView = require('views/home/header-view');

TasksModel = require('models/tasks');

TasksView = require('views/home/tasks-view');

TaskManagerView = require('views/home/task-manager-view');

ImplementersModel = require('models/implementers');

module.exports = HomeController = (function(superClass) {
  extend(HomeController, superClass);

  function HomeController() {
    return HomeController.__super__.constructor.apply(this, arguments);
  }

  HomeController.prototype.beforeAction = function() {
    HomeController.__super__.beforeAction.apply(this, arguments);
    return this.reuse('header', HeaderView, {
      region: 'header'
    });
  };

  HomeController.prototype.index = function() {
    this.managerView = new TaskManagerView({
      region: 'columnNameContainer'
    });
    this.collection = new TasksModel;
    this.collectionView = new TasksView({
      collection: this.collection,
      region: 'tasks'
    });
    this.collection.fetch().success((function(_this) {
      return function() {
        _this.collectionView.render();
        return TasksModel.originalCollection = _this.collection.models;
      };
    })(this));
    this.collectionImplementer = new ImplementersModel;
    return this.collectionImplementer.fetch().success(console.log(ImplementersModel.cacheImplementer));
  };

  return HomeController;

})(Controller);
});

;require.register("initialize", function(exports, require, module) {
var Application, routes;

Application = require('application');

routes = require('routes');

$(function() {
  return new Application({
    title: 'Brunch example application',
    controllerSuffix: '-controller',
    routes: routes
  });
});
});

;require.register("lib/utils", function(exports, require, module) {
var Chaplin, utils;

Chaplin = require('chaplin');

utils = Chaplin.utils.beget(Chaplin.utils);

if (typeof Object.seal === "function") {
  Object.seal(utils);
}

module.exports = utils;
});

;require.register("lib/view-helper", function(exports, require, module) {
var register, utils,
  slice = [].slice;

utils = require('./utils');

register = function(name, fn) {
  return Handlebars.registerHelper(name, fn);
};

register('with', function(context, options) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

register('without', function(context, options) {
  var inverse;
  inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers["with"].call(this, context, options);
});

register('url', function() {
  var i, options, params, routeName;
  routeName = arguments[0], params = 3 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 1, []), options = arguments[i++];
  return utils.reverse(routeName, params);
});
});

;require.register("mediator", function(exports, require, module) {
var Chaplin, mediator;

Chaplin = require('chaplin');

mediator = module.exports = Chaplin.mediator;
});

;require.register("models/base/collection", function(exports, require, module) {
var Chaplin, Collection, Model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

Model = require('./model');

module.exports = Collection = (function(superClass) {
  extend(Collection, superClass);

  function Collection() {
    return Collection.__super__.constructor.apply(this, arguments);
  }

  Collection.prototype.model = Model;

  return Collection;

})(Chaplin.Collection);
});

;require.register("models/base/model", function(exports, require, module) {
var Chaplin, Model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

module.exports = Model = (function(superClass) {
  extend(Model, superClass);

  function Model() {
    return Model.__super__.constructor.apply(this, arguments);
  }

  return Model;

})(Chaplin.Model);
});

;require.register("models/implementer", function(exports, require, module) {
var Implementer, Model,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Model = require('models/base/model');

module.exports = Implementer = (function(superClass) {
  extend(Implementer, superClass);

  function Implementer() {
    return Implementer.__super__.constructor.apply(this, arguments);
  }

  return Implementer;

})(Model);
});

;require.register("models/implementers", function(exports, require, module) {
var Chaplin, Collection, Implementer, Implementers,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Implementer = require('models/implementer');

Collection = require('models/base/collection');

Chaplin = require('chaplin');

module.exports = Implementers = (function(superClass) {
  extend(Implementers, superClass);

  function Implementers() {
    this.createNewImplementer = bind(this.createNewImplementer, this);
    return Implementers.__super__.constructor.apply(this, arguments);
  }

  Implementers.prototype.model = Implementer;

  Implementers.prototype.url = 'http://127.0.0.1:8000/api/v1/implementers/';

  Implementers.prototype.initialize = function() {
    Implementers.__super__.initialize.apply(this, arguments);
    Chaplin.mediator.subscribe('newImplementer', this.createNewImplementer);
    return Implementers.cacheImplementer = this;
  };

  Implementers.prototype.parse = function(data) {
    return data.objects;
  };

  Implementers.prototype.createNewImplementer = function(implementer) {
    var implementerModel;
    implementerModel = this.create(implementer, {
      wait: true
    });
    return Implementers.cacheImplementer.push(implementerModel);
  };

  return Implementers;

})(Collection);
});

;require.register("models/task", function(exports, require, module) {
var Model, Task,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Model = require('models/base/model');

module.exports = Task = (function(superClass) {
  extend(Task, superClass);

  function Task() {
    return Task.__super__.constructor.apply(this, arguments);
  }

  return Task;

})(Model);
});

;require.register("models/tasks", function(exports, require, module) {
var Chaplin, Collection, Task, Tasks,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Task = require('models/task');

Collection = require('models/base/collection');

Chaplin = require('chaplin');

module.exports = Tasks = (function(superClass) {
  extend(Tasks, superClass);

  function Tasks() {
    this.createNewTask = bind(this.createNewTask, this);
    return Tasks.__super__.constructor.apply(this, arguments);
  }

  Tasks.prototype.model = Task;

  Tasks.prototype.url = 'http://127.0.0.1:8000/api/v1/tasks/';

  Tasks.prototype.initialize = function() {
    Tasks.__super__.initialize.apply(this, arguments);
    return Chaplin.mediator.subscribe('newTask', this.createNewTask);
  };

  Tasks.prototype.parse = function(data) {
    return data.objects;
  };

  Tasks.prototype.createNewTask = function(task) {
    return this.create(task);
  };

  return Tasks;

})(Collection);
});

;require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  return match('', 'home#index');
};
});

;require.register("views/base/collection-view", function(exports, require, module) {
var Chaplin, CollectionView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

View = require('./view');

module.exports = CollectionView = (function(superClass) {
  extend(CollectionView, superClass);

  function CollectionView() {
    return CollectionView.__super__.constructor.apply(this, arguments);
  }

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);
});

;require.register("views/base/view", function(exports, require, module) {
var Chaplin, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Chaplin = require('chaplin');

require('lib/view-helper');

module.exports = View = (function(superClass) {
  extend(View, superClass);

  function View() {
    return View.__super__.constructor.apply(this, arguments);
  }

  View.prototype.optionNames = Chaplin.View.prototype.optionNames.concat(['template']);

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  View.prototype.render = function() {
    View.__super__.render.apply(this, arguments);
    return typeof this.onReady === "function" ? this.onReady() : void 0;
  };

  return View;

})(Chaplin.View);
});

;require.register("views/home/header-view", function(exports, require, module) {
var HeaderView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

module.exports = HeaderView = (function(superClass) {
  extend(HeaderView, superClass);

  function HeaderView() {
    return HeaderView.__super__.constructor.apply(this, arguments);
  }

  HeaderView.prototype.autoRender = true;

  HeaderView.prototype.className = 'header';

  HeaderView.prototype.tagName = 'header';

  HeaderView.prototype.template = require('./templates/header');

  return HeaderView;

})(View);
});

;require.register("views/home/implementer-view", function(exports, require, module) {

});

;require.register("views/home/implementer-window-view", function(exports, require, module) {
var Chaplin, ImplementerWindowView, Template, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

Template = require('views/home/templates/implementer-window');

Chaplin = require('chaplin');

module.exports = ImplementerWindowView = (function(superClass) {
  extend(ImplementerWindowView, superClass);

  function ImplementerWindowView() {
    return ImplementerWindowView.__super__.constructor.apply(this, arguments);
  }

  ImplementerWindowView.prototype.template = Template;

  ImplementerWindowView.prototype.autoRender = true;

  ImplementerWindowView.prototype.className = "modal-window";

  ImplementerWindowView.prototype.events = {
    'click #save-implementer-button': 'saveImplementer',
    'click #close-button': 'removeWindow',
    'input .name-implementer': 'validate'
  };

  ImplementerWindowView.prototype.saveImplementer = function() {
    var implementer;
    implementer = {
      name: $('.name-implementer').val()
    };
    if (!this.validate) {
      return;
    }
    Chaplin.mediator.publish('newImplementer', implementer);
    return this.remove();
  };

  ImplementerWindowView.prototype.validate = function() {
    var valid;
    valid = true;
    if (!/^[A-Z][a-z\s]{2,10}$/.test($('.name-implementer').val())) {
      valid = false;
      this.$('.valid').text('Error: input good name');
    } else {
      this.$('.valid').text('Good Name!');
    }
    console.log(valid);
    return valid;
  };

  ImplementerWindowView.prototype.removeWindow = function() {
    console.log('removeWindow');
    return this.remove();
  };

  return ImplementerWindowView;

})(View);
});

;require.register("views/home/task-manager-view", function(exports, require, module) {
var Chaplin, ImplementerWindowView, TaskManagerView, TaskWindowView, Template, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

Template = require('views/home/templates/task-manager');

TaskWindowView = require('views/home/task-window-view');

ImplementerWindowView = require('views/home/implementer-window-view');

Chaplin = require('chaplin');

module.exports = TaskManagerView = (function(superClass) {
  extend(TaskManagerView, superClass);

  function TaskManagerView() {
    return TaskManagerView.__super__.constructor.apply(this, arguments);
  }

  TaskManagerView.prototype.template = Template;

  TaskManagerView.prototype.autoRender = true;

  TaskManagerView.prototype.className = 'header-task';

  TaskManagerView.prototype.events = {
    'click #add-task': 'showWindowTask',
    'click #add-implementer': 'showWindowImplementer',
    'click #delete-check-tasks': 'deleteCheckTasks',
    'mouseenter .menu-option-status': 'showWindowStatus',
    'mouseleave .menu-option-status': 'hideWindowStatus',
    'click .option-status': 'saveFilterStatus'
  };

  TaskManagerView.prototype.showWindowTask = function() {
    return this.taskWindowView = new TaskWindowView({
      region: 'modalWindow'
    });
  };

  TaskManagerView.prototype.showWindowImplementer = function() {
    return this.implementerWindowView = new ImplementerWindowView({
      region: 'modalWindow'
    });
  };

  TaskManagerView.prototype.deleteCheckTasks = function() {
    Chaplin.mediator.publish('deleteMarked');
    return Chaplin.mediator.publish('renderCollection');
  };

  TaskManagerView.prototype.showWindowStatus = function() {
    if (this.menuOpionStatus == null) {
      this.menuOpionStatus = this.$('.menu-option-status');
    }
    if (this.propertyButtonStatus == null) {
      this.propertyButtonStatus = this.$('.property-button-status');
    }
    this.menuOpionStatus.css('height', '550');
    this.menuOpionStatus.css('background', '#263748');
    this.menuOpionStatus.css('border-left', '1px solid #3598DC');
    this.menuOpionStatus.css('border-right', '1px solid #3598DC');
    return this.menuOpionStatus.css('border-bottom', '1px solid #3598DC');
  };

  TaskManagerView.prototype.hideWindowStatus = function() {
    this.menuOpionStatus.css('height', '50');
    return this.menuOpionStatus.css('background', '#3598DC');
  };

  TaskManagerView.prototype.saveFilterStatus = function(event) {
    var status;
    status = {
      status: event.target.textContent
    };
    this.$('.option-status-top').text(event.target.textContent);
    Chaplin.mediator.publish('saveStatus', status);
    return this.hideWindowStatus();
  };

  return TaskManagerView;

})(View);
});

;require.register("views/home/task-view", function(exports, require, module) {
var Chaplin, TaskView, Template, View,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

Template = require('views/home/templates/task');

Chaplin = require('chaplin');

module.exports = TaskView = (function(superClass) {
  extend(TaskView, superClass);

  function TaskView() {
    this.deleteTask = bind(this.deleteTask, this);
    return TaskView.__super__.constructor.apply(this, arguments);
  }

  TaskView.prototype.template = Template;

  TaskView.prototype.className = 'task';

  TaskView.prototype.tagName = "div";

  TaskView.prototype.events = {
    'click .delete-task': 'checkTask'
  };

  TaskView.prototype.initialize = function() {
    return this.marked = true;
  };

  TaskView.prototype.checkTask = function() {
    this.marked = !this.marked;
    if (this.marked) {
      console.log('@marked');
      return Chaplin.mediator.unsubscribe('deleteMarked', this.deleteTask);
    } else {
      return Chaplin.mediator.subscribe('deleteMarked', this.deleteTask);
    }
  };

  TaskView.prototype.deleteTask = function() {
    return this.model.destroy();
  };

  return TaskView;

})(View);
});

;require.register("views/home/task-window-view", function(exports, require, module) {
var Chaplin, ImplementersModel, TaskWindowView, Template, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

Template = require('views/home/templates/task-window');

ImplementersModel = require('models/implementers');

Chaplin = require('chaplin');

module.exports = TaskWindowView = (function(superClass) {
  extend(TaskWindowView, superClass);

  function TaskWindowView() {
    return TaskWindowView.__super__.constructor.apply(this, arguments);
  }

  TaskWindowView.prototype.template = Template;

  TaskWindowView.prototype.autoRender = true;

  TaskWindowView.prototype.className = "modal-window";

  TaskWindowView.prototype.events = {
    'click #close-button': 'removeWindow',
    'click #save-task-button': 'saveTask',
    'input .event-valid': 'validate',
    'mouseleave .event-valid': 'validate',
    'click #option-status': 'saveFilterStatus',
    'click #implementer': 'saveSelectImplementer'
  };

  TaskWindowView.prototype.removeWindow = function() {
    return this.remove();
  };

  TaskWindowView.prototype.saveTask = function() {
    var task;
    task = {
      title: $('#title').val(),
      status: this.$('#status-top').text(),
      implementer: ImplementersModel.cacheImplementer._byId[$('#implementer-top').attr('value')]
    };
    if (!this.validate(task)) {
      return;
    }
    Chaplin.mediator.publish('newTask', task);
    Chaplin.mediator.publish('renderCollection');
    return this.removeWindow();
  };

  TaskWindowView.prototype.saveFilterStatus = function(event) {
    return this.$('#status-top').text(event.target.textContent);
  };

  TaskWindowView.prototype.saveSelectImplementer = function() {
    this.$('#implementer-top').text(event.target.textContent);
    return this.$('#implementer-top').attr('value', event.target.attributes.value.value);
  };

  TaskWindowView.prototype.validate = function() {
    var str, valid;
    valid = true;
    str = '';
    if (!(/^[A-Z][a-z\s\d]{3,20}$/.test($('#title').val()))) {
      valid = false;
      str = 'Error: Edit title';
      this.$('.valid').css('Error: Edit title');
    }
    if (this.$('#implementer-top').text() === 'Select implementer') {
      valid = false;
      str = str + '\n' + 'Error: Edit implementer';
    }
    this.$('.valid').text(str);
    if (str === '') {
      this.$('.valid').text('All rows in the order');
    }
    return valid;
  };

  TaskWindowView.prototype.getTemplateData = function() {
    return ImplementersModel.cacheImplementer.models;
  };

  return TaskWindowView;

})(View);
});

;require.register("views/home/tasks-view", function(exports, require, module) {
var Chaplin, CollectionView, TaskView, TasksModel, TasksView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CollectionView = require('views/base/collection-view');

TaskView = require('views/home/task-view');

TasksModel = require('models/tasks');

Chaplin = require('chaplin');

module.exports = TasksView = (function(superClass) {
  extend(TasksView, superClass);

  function TasksView() {
    this.renderCollection = bind(this.renderCollection, this);
    this.filterStatus = bind(this.filterStatus, this);
    return TasksView.__super__.constructor.apply(this, arguments);
  }

  TasksView.prototype.itemView = TaskView;

  TasksView.prototype.tagName = 'div';

  TasksView.prototype.className = 'tasks';

  TasksView.prototype.initialize = function() {
    Chaplin.mediator.subscribe('saveStatus', this.filterStatus);
    return Chaplin.mediator.subscribe('renderCollection', this.renderCollection);
  };

  TasksView.prototype.filterStatus = function(status) {
    if (status.status === "All status") {
      this.collection.reset(TasksModel.originalCollection);
      return this.renderCollection();
    } else {
      this.collection.reset(TasksModel.originalCollection);
      this.collection.reset(this.collection.where(status));
      return this.render();
    }
  };

  TasksView.prototype.renderCollection = function() {
    return this.render();
  };

  return TasksView;

})(CollectionView);
});

;require.register("views/home/templates/header", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"logo\">Task manager</div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/implementer-window", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"window implementer-window\">\n    <div class=\"name-window\">Add implementer</div>\n    <input class=\"name-implementer\" type=\"text\" id=\"title\"  value=\"Input name implementer\">\n    <div class=\"valid valid-implementer\"></div>\n    <div class=\"button\" id=\"save-implementer-button\">save</div>\n    <div class=\"button\" id=\"close-button\">close</div>\n</div>";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/modal-window", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!--<div class = \"modal-window\"></div>-->";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/task-manager", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"property-button-task\" id=\"add-task\">Add Task</div>\n<div class=\"property-button-status\" id=\"filter-status-button\">\n    <div class =\"menu-option-status\">\n        <div class=\"option-status-top\">All status</div>\n        <div class=\"option-status\">All status</div>\n        <div class=\"option-status\">New</div>\n        <div class=\"option-status\">Reopened</div>\n        <div class=\"option-status\">Assigned</div>\n        <div class=\"option-status\">InProgress</div>\n        <div class=\"option-status\">Feedback</div>\n        <div class=\"option-status\">Resolved</div>\n        <div class=\"option-status\">Testing</div>\n        <div class=\"option-status\">Deployment</div>\n        <div class=\"option-status\">Closed</div></div>\n</div>\n<div class=\"property-button-task\" id=\"add-implementer\">Add implementer</div>\n<div class=\"property-button-task\" id=\"delete-check-tasks\">Delete the marked</div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/task-window", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <div class=\"option-status\" id=\"implementer\" value=\""
    + alias2(alias1((depth0 != null ? depth0.cid : depth0), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"window task-window\">\n    <div class=\"name-window\">Create Task</div>\n    <input class=\"event-valid\" id=\"title\" type=\"text\" value=\"Input Title Task\">\n    <div class =\"menu-option-status\">\n        <div class=\"option-top\" id=\"status-top\">New</div>\n        <div class=\"option-status\" id=\"option-status\">New</div>\n        <div class=\"option-status\" id=\"option-status\">Reopened</div>\n        <div class=\"option-status\" id=\"option-status\">Assigned</div>\n        <div class=\"option-status\" id=\"option-status\">InProgress</div>\n        <div class=\"option-status\" id=\"option-status\">Feedback</div>\n        <div class=\"option-status\" id=\"option-status\">Resolved</div>\n        <div class=\"option-status\" id=\"option-status\">Testing</div>\n        <div class=\"option-status\" id=\"option-status\">Deployment</div>\n        <div class=\"option-status\" id=\"option-status\">Closed</div>\n    </div>\n    <div class =\"menu-option-status event-valid\" id=\"implementers\">\n        <div class=\"option-top\" id=\"implementer-top\" value=\"e\">Select implementer</div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"valid\"></div>\n    <div class=\"button\" id=\"save-task-button\">save</div>\n    <div class=\"button\" id=\"close-button\">close</div>\n\n</div>\n\n\n\n\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/task", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n    <div class=\"property-task\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"property-task\">"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"property-task\">"
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.implementer : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n    <div class=\"property-task\" id=\"checkbox\"><input type=\"checkbox\" class=\"delete-task\"></div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/site-view", function(exports, require, module) {
var SiteView, View,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

View = require('views/base/view');

module.exports = SiteView = (function(superClass) {
  extend(SiteView, superClass);

  function SiteView() {
    return SiteView.__super__.constructor.apply(this, arguments);
  }

  SiteView.prototype.container = 'body';

  SiteView.prototype.id = 'site-container';

  SiteView.prototype.regions = {
    header: '#header-container',
    main: '#page-container',
    manager: '#manager-container',
    tasks: '#tasks-container',
    modalWindow: '#modal-window-container',
    taskWindow: '.task-window-container',
    setImplementer: '#set-implementer',
    columnNameContainer: '#column-name-container'
  };

  SiteView.prototype.template = require('./templates/site');

  return SiteView;

})(View);
});

;require.register("views/templates/site", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"header-container\" id=\"header-container\"></div>\n\n<div class=\"outer-page-container\">\n    <div id=\"manager-container\" >\n        <div id=\"modal-window-container\" ></div>\n        <div id=\"column-name-container\"></div>\n        <div id=\"tasks-container\" ></div>\n    </div>\n</div>\n<div class=\"background\"></div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map