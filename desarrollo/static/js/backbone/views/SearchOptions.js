var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore'),
    utilidades = require('../../utilidades');

module.exports = Backbone.View.extend({
  el: $('#SearchOptions'),
  checkPieza: true,
  checkInvestigacion: true,
  events: {
    'click #checkPieza': 'togglePieza',
    'click #checkInvestigacion': 'toggleInvestigacion',
  },
  initialize: function (options) {
    this.options = options || {};
    if(utilidades.getParameterByName('piezas')==='false')
      this.checkPieza = false
    if(utilidades.getParameterByName('investigaciones')==='false')
      this.checkInvestigacion = false

    $('#checkPieza').prop('checked', this.checkPieza);
    $('#checkInvestigacion').prop('checked', this.checkInvestigacion);  
  },

  render: function () {
    return this;
  },

  togglePieza: function(){
    this.checkPieza = !this.checkPieza;
  },
  toggleInvestigacion: function(){
    this.checkInvestigacion = !this.checkInvestigacion;
  },
  getParametros: function (){
    var data = {};
    if(!this.checkPieza)
      data.piezas = this.checkPieza;
    if(!this.checkInvestigacion)
      data.investigaciones = this.checkInvestigacion
    return data;
  }
});