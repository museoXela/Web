var $ = require('jquery'),
    _ = require('underscore'),
    Q = require('q');

module.exports = (function  () {
    return {
        getJSON : function(data, self){
            url = '/buscar/';
            var deferred = Q.defer()
            $.get(url, data, function(jsonResponse){
                var objectResponse = JSON.parse(jsonResponse);
                objectResponse.self = self;
                deferred.resolve(objectResponse);
            });
            return deferred.promise;
        },
        getLocalStorage : function(key){
            item = localStorage.getItem(key);
            return JSON.parse(item);
        },
        setLocalStorage : function(key, data){
            localStorage.setItem(key, JSON.stringify(data));
        },
        inLocalStorage : function(codigo){
            var piezasGuardadas = this.getLocalStorage('piezasGuardadas'),
                almacenado = _.every(piezasGuardadas, function (e, indiceArray){
                    return e.codigo === codigo;
                });
            if ((piezasGuardadas === null) || (piezasGuardadas.length === 0))
                almacenado = false
            return almacenado;
        },
        popElement : function(elemento, arreglo){
            var indice = -1;
            _.each(arreglo, function (e, indiceArray){
                if(_.isEqual(elemento, e)===true){
                    indice = indiceArray;
                };
            });
            if(indice >= 0)
                arreglo.splice(indice,1);
            return arreglo;
        },
        pushElement : function(elemento, arreglo){
            arregloActualizado = arreglo || [];
            arregloActualizado.push(elemento);
            return arregloActualizado;
        },
        getParameterByName : function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        getURL : function (url, extraParameters) {
            var extraParametersEncoded = $.param(extraParameters);
            var seperator = url.indexOf('?') == -1 ? "?" : "&";

            return(url + seperator + extraParametersEncoded);
        },
        footerBottom: function (){
            var bodyHeight = $("body").height();
            var vwptHeight = $(window).height();
            console.log(bodyHeight + " " + vwptHeight);
            if (vwptHeight > bodyHeight) {
                $("#Footer").addClass('Footer-bottom');
            };
        }
    }
})();