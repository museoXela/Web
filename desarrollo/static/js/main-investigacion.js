var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
    Piezas = require('./backbone/collections/piezas'),
    HeaderView = require('./backbone/views/header'), 
    InvestigacionView = require('./backbone/views/investigacionDetail'),
    PiezasListView = require('./backbone/views/piezas'),
	utilidades = require('./utilidades');
    Backbone.$ = $;

function configuraciones() {
    var piezasCollection = new Piezas(),
        investigacion = new InvestigacionView(),
        codigoInvestigacion = window.location.pathname.split('/')[2];
	window.state = 'investigacionDetail';
    return {
        cargarFuncionalidad: function(){
            var header = new HeaderView({ config: 0 }),
                piezasList = new PiezasListView({
                    el: $('#Piezas-content'),
                }, piezasCollection);
            this.getInvestigacion();
            this.getPiezas();
        },
        getInvestigacion: function(){
            var dataInvestigacion = {
                codigoInvestigacion: codigoInvestigacion,
                recurso: 'investigacionDetail'
            };
            utilidades.getJSON(dataInvestigacion).then(function(data){
                investigacion = new InvestigacionView({ model: data });
                $('.Piezas').before(investigacion.render().el);
            });
        },
        getPiezas: function(){
            var dataPiezas = {
                codigoInvestigacion: codigoInvestigacion,
                recurso:'investigacionPiezas'
            };
            utilidades.getJSON(dataPiezas).then(function(data){
                _.each(data, function(pieza){
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