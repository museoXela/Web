var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	HeaderView = require('./backbone/views/header'),
	BusquedaView = require('./backbone/views/busqueda'),
    /*Piezas = require('./backbone/collections/piezas'), 
    InvestigacionView = require('./backbone/views/investigacionDetail'),
    PiezasListView = require('./backbone/views/piezas'),*/
	utilidades = require('./utilidades');
    Backbone.$ = $;
function configuraciones() {
	var busquedaView = new BusquedaView();
   	window.state = 'busqueda';
    return {
        cargarFuncionalidad: function(){
        	var header = new HeaderView({ config: 1 });
        },
		
    }
}
$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
	console.log("Start App!");
});
