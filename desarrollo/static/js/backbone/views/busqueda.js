var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    swig = require('swig'),
    utilidades = require('../../utilidades'),
    Piezas = require('../collections/piezas'),
    Investigaciones = require('../collections/investigaciones'),
    PiezasListView = require('./piezas'),
    InvestigacionesListView = require('./investigaciones'),
    SearchOptionsView = require('./SearchOptions');

module.exports = Backbone.View.extend({
  piezasCollection: new Piezas(),
  investigacionesCollection: new Investigaciones(),
  searchOptions: {},
  el: $('#content'),
  template: swig.compile($("#content").html()),
  events: {
    'click #SearchBox-button': 'buttonSearch',
    'click #Header-buttons-searchButton': 'displaySearchBox',
    'submit #SearchBox-form' : 'submitSearch',
  },
  initialize: function (options) {
    this.options = options || {};
    var piezasList = new PiezasListView({
      el: $('#Piezas-content')}, this.piezasCollection);
    this.searchOptions = new SearchOptionsView();
    investigacionesList = new InvestigacionesListView({
                    el: $('#Investigaciones-content') 
                }, this.investigacionesCollection);
    if(utilidades.getParameterByName('search') != ''){
      $('#search').val(utilidades.getParameterByName('search'));
    }
    this.startSearch();
  },
  startSearch: function (){
    piezas = utilidades.getParameterByName('piezas');
    investigaciones = utilidades.getParameterByName('investigaciones');
    keyword = utilidades.getParameterByName('search');
    if(piezas != 'false'){
      this.getPiezas(keyword);
    }
    if(investigaciones != 'false'){
      this.getInvestigaciones(keyword);
    }
  },
  getPiezas: function (keyword){
    var dataPiezas = {
      keyword: keyword,
      recurso: 'search-piezas'
    };
    this.piezasCollection.reset();
    utilidades.getJSON(dataPiezas, this).then(function(data){
      self = data.self;
      _.each(data, function(pieza){
        pieza.tipo = 'SearchPieza';
        self.piezasCollection.add(pieza);
      }, self);
      self.renderResultados($("#Search-results-piezas"), self.piezasCollection.length);
      self.renderResultados($("#Search-results-investigaciones"), self.investigacionesCollection.length); 
    });
  },
  getInvestigaciones: function(keyword){
    var dataInvestigaciones = {
      keyword: keyword,
      recurso: 'search-investigaciones'
    };
    utilidades.getJSON(dataInvestigaciones, this).then(function(data){
      self = data.self;
      _.each(data, function(investigacion){
        self.investigacionesCollection.add(investigacion);
      }, self);
      self.renderResultados($("#Search-results-piezas"), self.piezasCollection.length);
      self.renderResultados($("#Search-results-investigaciones"), self.investigacionesCollection.length); 
    });
  },
  renderResultados: function($el, cantidad){
    template = swig.compile($el.html());
    resultados = {
      data: cantidad
    };
    html = template(resultados);
    $el.html(html);
  },
  render: function () {
    resultados = {
      piezas: this.piezasCollection.length,
      investigaciones: this.investigacionesCollection.length
    };
    this.$el.html(this.template(resultados));
    return this;
  },
  buttonSearch: function (event) {
    this.submitSearch(event);
  },
  submitSearch: function(event) {
    data = this.searchOptions.getParametros();
    data.search = $('#search').val();
    url = utilidades.getURL('/busqueda/', data);
    window.location.href = url;
    event.preventDefault();
  }
});