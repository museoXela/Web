var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
    HeaderView = require('./backbone/views/header'),
	Piezas = require('./backbone/collections/piezas'),
	PiezasListView = require('./backbone/views/piezas'),
	CategoriasCollection = require('./backbone/collections/categorias'),
	CategoriasListView = require('./backbone/views/categorias'),
	CategoriaHeader = require('./backbone/views/categoria-header'),
    utilidades = require('./utilidades');
	Backbone.$ = $;
function configuraciones() {
	var piezasCollection = new Piezas(),
		categoriasCollection = new CategoriasCollection(),
        categoriasHeaderCollection = new CategoriasCollection();
	window.state = 'colecciones';
    return {
    	cargarFuncionalidad: function (){
    		var header = new HeaderView({ config: 0 }),
    			categoriasList = new CategoriasListView({
                    el: $('#Categorias-content'),
                    el2: $('#selectCategoria')
                }, categoriasCollection),
    			piezasList = new PiezasListView({
                    el: $('#Search-results'),
                }, piezasCollection);
    		if(utilidades.getParameterByName('coleccion') === ""){
    			var data = {
    				recurso: 'piezasExhibicion'
    			};
                var categoriaHeaderOptions = {
                    tipo: 0,
                };
                var categoriaHeader = new CategoriaHeader(categoriaHeaderOptions, categoriasHeaderCollection);

    			this.cargarColecciones();
    			this.getPiezas(data);
    		}else{
    			idColeccion = utilidades.getParameterByName('coleccion');
    			if(utilidades.getParameterByName('categoria') === ""){
    				var data = {
    					coleccion: idColeccion,
    					recurso: 'piezasColeccion'
    				};
                    var categoriaHeaderOptions = {
                        tipo: 1,
                        idColeccion: idColeccion,
                    };
                    var categoriaHeader = new CategoriaHeader(categoriaHeaderOptions, categoriasHeaderCollection);
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
                        var categoriaHeaderOptions = {
                            tipo: 2,
                            idColeccion: idColeccion,
                            idCategoria: idCategoria
                        };
                        var categoriaHeader = new CategoriaHeader(categoriaHeaderOptions, categoriasHeaderCollection);
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
                        var categoriaHeaderOptions = {
                            tipo: 3,
                            idColeccion: idColeccion,
                            idCategoria: idCategoria,
                            idClasificacion: idClasificacion
                        };
                        var categoriaHeader = new CategoriaHeader(categoriaHeaderOptions, categoriasHeaderCollection);

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
	                	coleccion.idColeccion = coleccion.id;
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
    		var self = {
    			idColecccion: id
    		}
    		utilidades.getJSON(data, self).then(function(data){
            	if(data.length == 0){
                    $('#Categorias-content').append('<p>No existen categorias en esta clasificación.</p>');
                }else{
                	datos = data.self;
	                _.each(data, function(coleccion){
	                	coleccion.tipo = 2;
	                	coleccion.idColeccion = datos.idColecccion;
	                	coleccion.idCategoria = coleccion.id;
	                    categoriasCollection.add(coleccion);
	                }, datos);    
                }
            });
    	},
    	cargarClasificacion: function (idColeccion, idCategoria){
    		var data = {
    			coleccion: idColeccion,
    			categoria: idCategoria,
    			recurso: 'coleccionesClasificacion'
    		};
    		var self = {
    			idColeccion: idColeccion,
    			idCategoria: idCategoria
    		}
    		utilidades.getJSON(data, self).then(function(data){
            	if(data.length == 0){
                    $('#Categorias-content').append('<p>No existen categorias en esta clasificación.</p>');
                }else{
                	datos = data.self;
	                _.each(data, function(coleccion){
	                	coleccion.tipo = 3;
	                	coleccion.idColeccion = datos.idColeccion;
	                	coleccion.idCategoria = datos.idCategoria;
	                	coleccion.idClasificacion = coleccion.id;
	                    categoriasCollection.add(coleccion);
	                }, datos);    
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
	var configuracionInicial = configuraciones();
	configuracionInicial.cargarFuncionalidad();
});