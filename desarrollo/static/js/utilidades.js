var $ = require('jquery'),
    q = require('q');

module.exports = (function  () {
    var loadTemplate = function (){
        var deferred = q.defer();
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

            }
        });
        return deferred.promise;
    }
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
        }
    }
})();