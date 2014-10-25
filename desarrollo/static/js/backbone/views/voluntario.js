var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'Voluntario',

  events: {
  },
  template: swig.compile($("#voluntario-template").html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var voluntario = this.model.toJSON();
    if(voluntario.tipo === 'Voluntario--Proyecto'){
      this.$el.addClass('Voluntario--Proyecto');
    }
    this.$el.html(this.template(voluntario));
    return this;
  }
});