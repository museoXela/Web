var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Eventos = require('./backbone/collections/eventos'),
    HeaderView = require('./backbone/views/header'),
	EventosListView = require('./backbone/views/eventos'),
    utilidades = require('./utilidades');
	Backbone.$ = $;
function configuraciones() {
	var eventosCollection = new Eventos();
	window.state = 'index';
    return {
    	cargarFuncionalidad: function (){
    		var header = new HeaderView({ config: 0 }),
                eventosList = new EventosListView({
                    el: $('#Eventos-content')
                }, eventosCollection);
            this.getEventos();
    	},
    	getEventos: function(){
            var dataEventos = {
                recurso:'eventos'
            };
            utilidades.getJSON(dataEventos).then(function(data){
                if(data.length === 0){
                    $('#Eventos-content').append('<p>No hay eventos programados para las proximas fechas</p>');
                }
                else{
                    _.each(data, function(evento){
                        evento.tipo = 'EventoCard'
                        eventosCollection.add(evento);
                    });    
                }
                
            });
        }
    }
};
$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
});