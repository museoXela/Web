var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'Pieza',

  events: {
    'click .Pieza-actions-iconHeart': 'toggleSave',
  },
  template: swig.compile($("#pieza-template").html()),
  initialize: function () {
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var pieza = this.model.toJSON();
    pieza.almacenado = utilidades.inLocalStorage(pieza.codigo);
    if(pieza.almacenado===true)
      this.$el.addClass('Pieza--saved');

    if(pieza.tipo === 'SearchPieza'){
      this.$el.removeClass('Pieza');
      this.$el.addClass('SearchPieza');
    }
    this.$el.html(this.template(pieza));
    this.model.set(pieza);
    return this;
  },
  toggleSave: function(event) {
    var pieza = this.model.toJSON();
    var piezasGuardadas = utilidades.getLocalStorage('piezasGuardadas');
    var piezasActualizadas = [];
    if(pieza.almacenado===true){
      this.$el.removeClass('Pieza--saved');
      piezasActualizadas = utilidades.popElement(pieza, piezasGuardadas);
      utilidades.setLocalStorage('piezasGuardadas', piezasActualizadas)
      if(window.state === 'index'){
        this.collection.remove(this.model);
        this.$el.remove();
      }
      pieza.almacenado = false;
    }else{
      pieza.almacenado = true;
      this.$el.addClass('Pieza--saved');
      piezasActualizadas = utilidades.pushElement(pieza, piezasGuardadas);
      utilidades.setLocalStorage('piezasGuardadas', piezasActualizadas);
    };
    this.model.set(pieza);
  }
});