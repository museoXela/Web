var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Piezas = require('./backbone/collections/piezas'),
	Eventos = require('./backbone/collections/eventos'),
    HeaderView = require('./backbone/views/header'),
	PiezaView = require('./backbone/views/pieza'),
	PiezasListView = require('./backbone/views/piezas'),
	EventosListView = require('./backbone/views/eventos'),
    utilidades = require('./utilidades');
	Backbone.$ = $;

function configuraciones() {
	var piezas = new Piezas(),
        eventosCollection = new Eventos();
	window.state = 'index';
    return {
    	cargarFuncionalidad: function (){
    		var header = new HeaderView({ config: 1 }),
    			piezasList = new PiezasListView({
    				el: $('#Piezas-content'),
    			}, piezas),
                eventosList = new EventosListView({
                    el: $('#Eventos-content')
                }, eventosCollection);
            this.getEventos();
    	},
    	cargarPiezas: function(){
    		var piezasGuardadas = utilidades.getLocalStorage('piezasGuardadas');
    		_.each(piezasGuardadas, function(pieza){
    			piezas.add(pieza);
    		});
    	},
        getEventos: function(){
            var dataEventos = {
                recurso:'eventos',
            };
            utilidades.getJSON(dataEventos).then(function(data){
                if(data.length == 0){
                    $('#Eventos-content').append('<p>No hay eventos programados para las proximas fechas</p>');
                }else{
                    _.each(data, function(evento){
                        eventosCollection.add(evento);
                    });    
                }
                
            });/*
            for(var i=0; i < 3; i++){
                eventosCollection.add({titulo: 'Evento '+i})
            };*/
        }
    }
};

$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
	configuracionInicial.cargarPiezas();
});