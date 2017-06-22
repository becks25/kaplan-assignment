(function (angular) {
    'use strict';

    var module = angular.module('productServices', []);

    module.service('productServices', function ($http) {
        
        return {

            getProducts: function(){
                return $http.get(`api/products`)
                    .then(response => response.data)
            },

            makeOrder: function(order){
                
            }
           

        };
    });

}(window.angular));


