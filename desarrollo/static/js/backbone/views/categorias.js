var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    CategoriaView = require('./categoria'),
    CategoriaSelectView = require('./categoria-select');

module.exports = Backbone.View.extend({
  events: {
    'click #selectCategoria' : 'cambiarCategoria',
  },
  initialize: function (options, collection) {
    this.collection = collection || {};
    this.options = options || {};
    this.el = this.options.el;
    this.el2 = this.options.el2;
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.render, this);
    $('select').on('change', this.cambiarCategoria);
  },
  cambiarCategoria: function (event){
    var optionSelected = $("option:selected");
    var valueSelected = this.value;
    var tipo = optionSelected.attr("data-tipo");
    if(tipo === "1"){
      var idColeccion = optionSelected.attr("data-idColeccion");
      window.location.href = "/colecciones/?coleccion=" + idColeccion;
    }
    if(tipo === "2"){
      var idColeccion = optionSelected.attr("data-idColeccion"),
          idCategoria = optionSelected.attr("data-idCategoria");
      window.location.href = "/colecciones/?coleccion=" + idColeccion + "&categoria="+idCategoria;
    }
    if(tipo === "3"){
      var idColeccion = optionSelected.attr("data-idColeccion"),
          idCategoria = optionSelected.attr("data-idCategoria"),
          idClasificacion = optionSelected.attr("data-idClasificacion");
      window.location.href = "/colecciones/?coleccion=" + idColeccion + "&categoria=" + idCategoria + "&clasificacion=" + idClasificacion;
    }
  },
  render: function () {
    this.$el.empty();
    this.addAll();
  },

  addOne: function (categoria) {
    var categoriaView = new CategoriaView({ model: categoria, collection: this.collection }),
        categoriaSelectView = new CategoriaSelectView({ model: categoria, collection: this.collection });
    this.$el.append(categoriaView.render().el);
    this.el2.append(categoriaSelectView.render().el);
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this);
  }
});