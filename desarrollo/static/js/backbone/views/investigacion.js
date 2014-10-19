var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'Investigacion',

  events: {
  },
  template: swig.compile($("#investigacion-template").html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var pieza = this.model.toJSON();
    this.$el.html(this.template(pieza));
    return this;
  }
});