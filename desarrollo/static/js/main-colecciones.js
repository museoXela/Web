var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Piezas = require('./backbone/collections/piezas'),
	PiezasListView = require('./backbone/views/piezas'),
	CategoriasCollection = require('./backbone/collections/categorias'),
	CategoriasListView = require('./backbone/views/categorias'),
	utilidades = require('./utilidades');
	Backbone.$ = $;
function configuraciones() {
	var piezasCollection = new Piezas(),
		categoriasCollection = new CategoriasCollection();
	window.state = 'colecciones';
    return {
    	cargarFuncionalidad: function (){
    		var categoriasList = new CategoriasListView({
                    el: $('#Categorias-content'),
                    el2: $('#selectCategoria')
                }, categoriasCollection),
    			piezasList = new PiezasListView({
                    el: $('#Search-results'),
                }, piezasCollection);
    		if(utilidades.getParameterByName('coleccion') === ""){
    			this.cargarColecciones();
    		}else{
    			idColeccion = utilidades.getParameterByName('coleccion');
    			console.log(idColeccion);
    			if(utilidades.getParameterByName('categorias') === ""){

    			}else{

    			}
    		}
    	},
    	cargarColecciones: function(){
    		var data = {
            	recurso:'colecciones',
            };
            utilidades.getJSON(data).then(function(data){
            	if(data.length == 0){
                    $('#Categorias-content').append('<p>No existen categorias en esta clasificación.</p>');
                }else{
	                _.each(data, function(coleccion){
	                	coleccion.tipo = 1;
	                    categoriasCollection.add(coleccion);
	                });    
                }
            });
    	},
    	cargarCategorias: function(id){
    		for(var i=0; i < 5; i++){
    			data = {
    				id: i,
    				nombre: "Categoria " + i,
    				tipo: 2,
    				idColeccion: id
    			};
    			categoriasCollection.add(data);
    		}
    	},
    	cargarClasificacion: function (id){
    		for(var i=0; i < 5; i++){
    			data = {
    				id: i,
    				nombre: "Categoria " + i,
    				tipo: 1
    			};
    			categoriasCollection.add(data);
    		}
    	},
    	getPiezas: function(dataPiezas){
            dataPiezas.recurso = 'investigacionPiezas';
            dataPiezas.codigoInvestigacion = 1;
            utilidades.getJSON(dataPiezas).then(function(data){
                _.each(data, function(pieza){
                	pieza.tipo = 'SearchPieza';
                    piezasCollection.add(pieza);
                });
            });
        }
    }
}
$(function(){
	console.log("Start app");
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
});