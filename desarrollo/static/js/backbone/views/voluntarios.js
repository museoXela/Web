var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    VoluntarioView = require('./voluntario');

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

  addOne: function (voluntario) {
    var voluntarioView = new VoluntarioView({ model: voluntario, collection: this.collection });
    this.$el.append(voluntarioView.render().el);
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});