var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
    Investigaciones = require('./backbone/collections/investigaciones'),
    HeaderView = require('./backbone/views/header'), 
    PiezaView = require('./backbone/views/piezaDetail'),
    InvestigacionesListView = require('./backbone/views/investigaciones'),
    utilidades = require('./utilidades');
	Backbone.$ = $;

function configuraciones() {
    var investigacionesCollection = new Investigaciones(),
        pieza = new PiezaView(),
        codigoPieza = window.location.pathname.split('/')[2];
	window.state = 'piezaDetail';
    return {
        cargarFuncionalidad: function (){
            var header = new HeaderView({ config: 0 }),
                investigacionesList = new InvestigacionesListView({
                    el: $('#Investigaciones-content') 
                }, investigacionesCollection);
            this.getPieza();
            this.getInvestigaciones();
        },
        getInvestigaciones: function(){
            var dataInvestigaciones = {
                codigoPieza: codigoPieza,
                recurso:'piezaInvestigaciones'
            };
            utilidades.getJSON(dataInvestigaciones).then(function(data){
                if(data.length === 0){
                    debugger;
                    $('#Investigaciones-content').append('<p>No hay investigaciones relacionadas con esta pieza.</p>');
                }
                else{
                    _.each(data, function(investigacion){
                        investigacionesCollection.add(investigacion);
                    });
                }
            });
        },
        getPieza: function (){
            var dataPieza = {
                codigoPieza: codigoPieza,
                recurso: 'piezaDetail'
            };
            utilidades.getJSON(dataPieza).then(function(data){
                pieza = new PiezaView({ model: data });
                $('.Investigaciones').before(pieza.render().el);
            });
        }
    }
};

$(function(){
    console.log('Start app');
    var configuracionInicial = configuraciones();
    configuracionInicial.cargarFuncionalidad();
});