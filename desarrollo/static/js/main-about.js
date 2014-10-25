var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Voluntarios = require('./backbone/collections/voluntarios'),
	HeaderView = require('./backbone/views/header'),
	VoluntariosView = require('./backbone/views/voluntario'),
	VoluntariosListView = require('./backbone/views/voluntarios'),
	utilidades = require('./utilidades');
	Backbone.$ = $;
function configuraciones() {
	var voluntariosCollection = new Voluntarios();
	window.state = 'about';
    return {
    	cargarFuncionalidad: function (){
    		var header = new HeaderView({ config: 0 }),
    			voluntariosList = new VoluntariosListView({
    				el: $('#Voluntarios-content'),
    			}, voluntariosCollection);
    		this.getVoluntarios();
    	},
    	getVoluntarios: function(){
            var dataVoluntarios = {
                recurso:'voluntarios',
            };
            utilidades.getJSON(dataVoluntarios).then(function(data){
                if(data.length == 0){
                    $('#Voluntarios-content').append('<p>No se han encontrado colaboradores.</p>');
                }else{
                    _.each(data, function(voluntario){
                        voluntario.tipo = 'Voluntario--Proyecto'
                        voluntariosCollection.add(voluntario);
                    });    
                }
                
            });
        }
    }
}

$(function(){
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
	console.log("Start App");
});