var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Piezas = require('./backbone/collections/piezas'),
	HeaderView = require('./backbone/views/header'),
	PiezaView = require('./backbone/views/pieza'),
	PiezasListView = require('./backbone/views/piezas'),
	utilidades = require('./utilidades');
	Backbone.$ = $;

function configuraciones() {
	var piezas = new Piezas();
	window.state = 'index';
    return {
    	cargarFuncionalidad: function (){
    		var header = new HeaderView({ config: 1 }),
    			piezasList = new PiezasListView({
    				el: $('#Piezas-content'),
    			}, piezas);
    	},
    	cargarPiezas: function(){
    		var piezasGuardadas = utilidades.getLocalStorage('piezasGuardadas');
    		_.each(piezasGuardadas, function(pieza){
    			piezas.add(pieza);
    		});
    	}
    }
};

$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
	configuracionInicial.cargarPiezas();
});