CollectionView = require 'views/base/collection-view'
Template = require 'views/home/templates/implementers'
ImplementerView = require 'views/home/implementer-view'





module.exports = class ImplementersView extends CollectionView
  itemView: ImplementerView
  template: Template
#  autoRender: true
