var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'PiezaDetail',

  events: {
    'click .Pieza-actions-iconHeart': 'toggleSave',
  },
  template: swig.compile($('#PiezaDetail-template').html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    this.$el.html(this.template(this.model));
    return this;
  }
});