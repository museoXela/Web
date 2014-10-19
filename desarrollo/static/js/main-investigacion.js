var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
    Q = require('q'),
    Piezas = require('./backbone/collections/piezas'),
    InvestigacionView = require('./backbone/views/investigacionDetail'),
    PiezasListView = require('./backbone/views/piezas');
	Backbone.$ = $;

function configuraciones() {
    var piezasCollection = new Piezas();
	window.state = 'investigacionDetail';
    return {
        cargarFuncionalidad: function(){
            var piezasList = new PiezasListView({
                    el: $('#Piezas-content'),
                }, piezasCollection);
            this.getInvestigacionDetail().then(function(data){
                var investigacion = new InvestigacionView({ model: data });
                $('.Piezas').before(investigacion.render().el);
            });
            this.getPiezas();
        },
        getInvestigacionDetail: function (){
            var deferred = Q.defer()
            var data = {};
            data.codigoInvestigacion = window.location.pathname.split('/')[2];
            data.recurso = 'investigacionDetail';
            url = '/buscar/';
            $.get(url, data, function(investigacionResponse){
                var investigacionDetail = JSON.parse(investigacionResponse);
                deferred.resolve(investigacionDetail);
            });
            return deferred.promise;
        },
        getPiezas: function(){
            var data = {};
            data.codigoInvestigacion = window.location.pathname.split('/')[2];
            data.recurso = 'investigacionPiezas'
            url = '/buscar/'
            $.get(url, data, function(piezasResponse){
                piezas = JSON.parse(piezasResponse);
                _.each(piezas, function(pieza){
                    console.log(pieza)
                    piezasCollection.add(pieza);
                });
            });
        }

    }
};

$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
});