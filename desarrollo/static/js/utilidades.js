var $ = require('jquery'),
    _ = require('underscore'),
    q = require('q');

module.exports = (function  () {
    return {
        loadTemplate : function (url){
            $.ajax({
                url: '/pruebas/header',
                dataType: 'html',
                success: function(data){
                    deferred.resolve(data);
                },
                error: function(error){
                    deferred.reject('<p>Algo ha salido mal</p>');
                },
                always: function(data){
                     $.trigger("TEMPLATE_LOADED", [url]);
                }
            });
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