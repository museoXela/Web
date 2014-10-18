var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    PiezaView = require('./pieza');

module.exports = Backbone.View.extend({
  events: {
  },
  initialize: function (options, collection) {
    this.collection = collection || {};
    this.options = options || {};
    this.el = this.options.el;
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.render, this);
  },

  render: function () {
    this.$el.empty();
    this.addAll();
  },

  addOne: function (pieza) {
    var piezaView = new PiezaView({ model: pieza, collection: this.collection });
    this.$el.append(piezaView.render().el);
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});