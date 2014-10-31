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
    			var data = {
    				recurso: 'piezasExhibicion'
    			}
    			this.cargarColecciones();
    			this.getPiezas(data);
    		}else{
    			idColeccion = utilidades.getParameterByName('coleccion');
    			if(utilidades.getParameterByName('categoria') === ""){
    				var data = {
    					coleccion: idColeccion,
    					recurso: 'piezasColeccion'
    				}
    				this.cargarCategorias(idColeccion);
    				this.getPiezas(data);
    			}else{
    				idCategoria = utilidades.getParameterByName('categoria');
    				if(utilidades.getParameterByName('clasificacion') === ""){
    					var data = {
	    					coleccion: idColeccion,
	    					categoria: idCategoria,
	    					recurso: 'piezasCategoria'
	    				}
    					this.cargarClasificacion(idColeccion, idCategoria);
    					this.getPiezas(data);
    				}else{
    					idClasificacion = utilidades.getParameterByName('clasificacion');
    					var data = {
    						coleccion: idColeccion,
	    					categoria: idCategoria,
    						clasificacion: idClasificacion,
	    					recurso: 'piezasClasificacion'
    					};
    					this.cargarClasificacion(idColeccion, idCategoria);
    					this.getPiezas(data);
    				}
    			};
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
    		var data = {
    			coleccion: id,
    			recurso: 'coleccionCategorias'
    		};
    		utilidades.getJSON(data).then(function(data){
            	if(data.length == 0){
                    $('#Categorias-content').append('<p>No existen categorias en esta clasificación.</p>');
                }else{
	                _.each(data, function(coleccion){
	                	coleccion.tipo = 2;
	                    categoriasCollection.add(coleccion);
	                });    
                }
            });
    	},
    	cargarClasificacion: function (idColeccion, idCategoria){
    		var data = {
    			coleccion: idColeccion,
    			categoria: idCategoria,
    			recurso: 'coleccionesClasificacion'
    		};
    		utilidades.getJSON(data).then(function(data){
            	if(data.length == 0){
                    $('#Categorias-content').append('<p>No existen categorias en esta clasificación.</p>');
                }else{
	                _.each(data, function(coleccion){
	                	coleccion.tipo = 3;
	                    categoriasCollection.add(coleccion);
	                });    
                }
            });
    	},
    	getPiezas: function(dataPiezas){
            utilidades.getJSON(dataPiezas).then(function(data){
                if(data.length == 0){
                	$('#Search-results').append('<h5>No existen piezas en esta clasificación.</h5>');
                }else{
	                _.each(data, function(pieza){
	                	pieza.tipo = 'SearchPieza';
	                    piezasCollection.add(pieza);
	                });
                };
            });
        }
    }
}
$(function(){
	console.log("Start app");
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
});