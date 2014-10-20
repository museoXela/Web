var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'Evento',

  events: {
  },
  template: swig.compile($("#evento-template").html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var evento = this.model.toJSON();
    if(evento.tipo === 'EventoCard'){
      this.$el.removeClass('Evento');
      this.$el.addClass('EventoCard');
    }
    this.$el.html(this.template(evento));
    return this;
  }
});