var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
    Q = require('q'),
    Investigaciones = require('./backbone/collections/investigaciones'),
    PiezaView = require('./backbone/views/piezaDetail'),
    InvestigacionesListView = require('./backbone/views/investigaciones'),
    utilidades = require('./utilidades');
	Backbone.$ = $;

function configuraciones() {
    var investigacionesCollection = new Investigaciones();
	window.state = 'piezaDetail';
    return {
        cargarFuncionalidad: function (){
            var investigacionesList = new InvestigacionesListView({
                    el: $('#Investigaciones-content'),
                }, investigacionesCollection);
            this.getPiezaDetail().then(function(data){
                var pieza = new PiezaView({ model: data });
                $('.Investigaciones').before(pieza.render().el);
            });
            this.getInvestigaciones();
        },
        getInvestigaciones: function(){
            var data = {};
            data.codigoPieza = window.location.pathname.split('/')[2];
            data.recurso = 'piezaInvestigaciones'
            url = '/buscar/'
            $.get(url, data, function(investigacionesResponse){
                investigaciones = JSON.parse(investigacionesResponse);
                _.each(investigaciones, function(investigacion){
                    console.log(investigacion)
                    investigacionesCollection.add(investigacion);
                });
            });
        },
        getPiezaDetail: function (){
            var deferred = Q.defer()
            var data = {};
            data.codigoPieza = window.location.pathname.split('/')[2];
            data.recurso = 'piezaDetail'
            url = '/buscar/'
            $.get(url, data, function(piezaResponse){
                pieza = JSON.parse(piezaResponse);
                deferred.resolve(pieza);
            });
            return deferred.promise;
        }
    }
};

$(function(){
    var configuracionInicial = configuraciones();
    configuracionInicial.cargarFuncionalidad();
	console.log("Hello world");
});