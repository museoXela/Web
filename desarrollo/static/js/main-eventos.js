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
            /*var dataEventos = {
                recurso:'eventos'
            };
            utilidades.getJSON(dataEventos).then(function(data){
                _.each(data, function(evento){
                    eventosCollection.add(evento);
                });
            });*/
			debugger;
            for(var i=0; i < 3; i++){
                eventosCollection.add({titulo: 'Evento '+i, tipo: 'EventoCard'})
            };
        }
    }
};
$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
	console.log('Start app')
});