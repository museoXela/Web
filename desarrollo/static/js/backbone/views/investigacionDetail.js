var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'section',
  className: 'InvestigacionDetail',

  events: {},
  template: swig.compile($('#InvestigacionDetail-template').html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    this.$el.html(this.template(this.model));
    return this;
  }
});