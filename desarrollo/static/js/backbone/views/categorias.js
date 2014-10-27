var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    CategoriaView = require('./categoria'),
    CategoriaSelectView = require('./categoria-select');

module.exports = Backbone.View.extend({
  events: {
  },
  initialize: function (options, collection) {
    this.collection = collection || {};
    this.options = options || {};
    this.el = this.options.el;
    this.el2 = this.options.el2;
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.render, this);
  },

  render: function () {
    this.$el.empty();
    this.addAll();
  },

  addOne: function (categoria) {
    var categoriaView = new CategoriaView({ model: categoria, collection: this.collection }),
        categoriaSelectView = new CategoriaSelectView({ model: categoria, collection: this.collection });
    this.$el.append(categoriaView.render().el);
    this.el2.append(categoriaSelectView.render().el);
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});