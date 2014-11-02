var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    CategoriaView = require('./categoria'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  el: $('#Categoria-Header'),

  events: {},
  initialize: function (options, collection) {
    this.collection = collection || {};
    this.options = options || {};
    this.listenTo(this.collection, "add", this.addOne, this);
    if(this.options.tipo === 0){
      this.$el.hide();     
    };
    if(this.options.tipo === 1){
      var idColeccion = this.options.idColeccion;
      this.cargarColeccion(idColeccion);
    };
    if(this.options.tipo === 2){
      var idColeccion = this.options.idColeccion,
          idCategoria = this.options.idCategoria;
      this.cargarCategoria(idColeccion, idCategoria);
    };
    if(this.options.tipo === 3){
      var idColeccion = this.options.idColeccion,
          idCategoria = this.options.idCategoria,
          idClasificacion = this.options.idClasificacion;
      this.cargarClasificacion(idColeccion, idCategoria, idClasificacion);
    };
  },

  render: function () {
    return this;
  },
  cargarColeccion: function(idColeccion){
    var dataColeccion = {
          coleccion: idColeccion,
          recurso: 'coleccion' },
        parametrosColeccion = {
          tipo: 1,
          idColeccion: idColeccion,
          context: this
        };
    this.cargarDatos(dataColeccion, parametrosColeccion);
  },
  cargarCategoria: function(idColeccion, idCategoria){
    var dataCategoria = {
          categoria: idCategoria,
          recurso: 'categoria' },
        parametrosCategoria = {
          tipo: 2,
          idColeccion: idColeccion,
          idCategoria: idCategoria };
    var dataColeccion = {
          coleccion: idColeccion,
          recurso: 'coleccion' },
        parametrosColeccion = {
          tipo: 1,
          idColeccion: idColeccion,
          context: this,
          postData: {
            data: dataCategoria,
            parametros: parametrosCategoria
        }};
    this.cargarDatos(dataColeccion, parametrosColeccion);
  },
  cargarClasificacion: function(idColeccion, idCategoria, idClasificacion){
    var dataClasificacion = {
          clasificacion: idClasificacion,
          recurso: 'clasificacion' },
        parametrosClasificacion = {
          tipo: 3,
          idColeccion: idColeccion,
          idCategoria: idCategoria,
          idClasificacion: idClasificacion };

    var dataCategoria = {
          categoria: idCategoria,
          recurso: 'categoria' },
        parametrosCategoria = {
          tipo: 2,
          idColeccion: idColeccion,
          idCategoria: idCategoria, 
          postData: {
            data: dataClasificacion,
            parametros: parametrosClasificacion,
        }};
    var dataColeccion = {
          coleccion: idColeccion,
          recurso: 'coleccion' },
        parametrosColeccion = {
          tipo: 1,
          idColeccion: idColeccion,
          context: this,
          postData: {
            data: dataCategoria,
            parametros: parametrosCategoria,
        }};
    this.cargarDatos(dataColeccion, parametrosColeccion);
  },
  cargarDatosPrueba: function(data, parametros){
    debugger;
    self = parametros || {};
    self.collection = this.collection;
    utilidades.getJSON(data, self).then(function(data){
      self = data.self;
      var categoria = {
        tipo: self.tipo,
        nombre: data.nombre,
        idColeccion: self.idColeccion || 0,
        idCategoria: self.idCategoria || 0,
        idClasificacion: self.idClasificacion || 0
      };
      self.collection.add(categoria);
      if(self.postData){
        var datos = self.postData.data,
            parametros = self.postData.parametros;
        selfPost = parametros;
        selfPost.collection = self.collection;
        utilidades.getJSON(datos, selfPost).then(function(data){
          self = data.self;
          var categoria = {
            tipo: self.tipo,
            nombre: data.nombre,
            idColeccion: self.idColeccion || 0,
            idCategoria: self.idCategoria || 0,
            idClasificacion: self.idClasificacion || 0
          };
          self.collection.add(categoria);
        });
      }
    });
  },
  cargarDatos: function (data, parametros){
    self = parametros || {};
    self.context = parametros.context;
    self.collection = parametros.context.collection;
    self.funcion = parametros.context.cargarDatos;
    utilidades.getJSON(data, self).then(function(data){
      self = data.self;
      var categoria = {
        tipo: self.tipo,
        nombre: data.nombre,
        idColeccion: self.idColeccion || 0,
        idCategoria: self.idCategoria || 0,
        idClasificacion: self.idClasificacion || 0
      };
      self.collection.add(categoria);
      if(self.postData){
        var datos = self.postData.data,
            parametros = self.postData.parametros;
        parametros.context = self.context
        self.funcion(datos, parametros);
      }
    });
  },
  addOne: function (categoria) {
    var categoriaView = new CategoriaView({ model: categoria, collection: this.collection });
    this.$el.append(categoriaView.render().el);
  }
});