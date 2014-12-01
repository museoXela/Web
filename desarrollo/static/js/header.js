var Backbone = require('backbone'),
	$ = require('jquery'),
	HeaderView = require('./backbone/views/header'),
	PiezaView = require('./backbone/views/pieza'),
	utilidades = require('./utilidades');
	Backbone.$ = $
	

$(function(){
	console.log('Hello World! 2');
	var header = new HeaderView({ config: 1 } );
	header.render();
	var i=0
	for(i; i < 6; i++){
		var pieza = new PiezaView({config: 1});
		pieza.render();
		$('#Piezas-content').append(pieza.el);
	}
	utilidades.setLocalStorage('prueba',{campo1: 2});
	console.log(utilidades.getLocalStorage('prueba'));
});