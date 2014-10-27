var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'option',
  attributes: {},
  events: {
  },
  template: swig.compile($("#categoria-select-template").html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var categoria = this.model.toJSON(),
        atributos = {};
    
    if(categoria.tipo === 1){
      atributos = {
        'data-id': categoria.id
      };  
    };
    if(categoria.tipo === 2){
      atributos = {
        'data-id': categoria.id,
        'data-idColeccion': categoria.idColeccion
      };  
    };
    if(categoria.tipo === 3){
      atributos = {
        'data-id': categoria.id,
        'data-idColeccion': categoria.idColeccion,
        'data-idCategoria': categoria.data-idCategoria
      };  
    };
    this.$el.attr(atributos);
    this.$el.html(this.template(categoria));
    return this;
  }
});