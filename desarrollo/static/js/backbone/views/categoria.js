var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'li',

  events: {
  },
  template: swig.compile($("#categoria-template").html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var categoria = this.model.toJSON();
    this.$el.html(this.template(categoria));
    return this;
  }
});