var $ = require('jquery'),
    _ = require('underscore'),
    Q = require('q');

module.exports = (function  () {
    return {
        getJSON : function(data){
            url = '/buscar/';
            var deferred = Q.defer()
            $.get(url, data, function(jsonResponse){
                var objectResponse = JSON.parse(jsonResponse);
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
        }
    }
})();