var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    EventoView = require('./evento');

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

  addOne: function (evento) {
    var eventoView = new EventoView({ model: evento, collection: this.collection });
    this.$el.append(eventoView.render().el);
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});