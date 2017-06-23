(function (angular) {
    'use strict';

    var module = angular.module('productServices', []);

    module.service('productServices', function ($http) {
        
        return {
            createProduct: function(prod){
                return $http.post(`api/products`, prod)
                    .then(response => response.data);
            },

            getProducts: function(){
                return $http.get(`api/products`)
                    .then(response => response.data);
            },

            updateProduct: function(prod){
                return $http.put(`api/products/${prod.product_sku}`, prod)
                    .then(response => response.data);
            },

            deleteProduct: function(prod){
                return $http.delete(`api/products/${prod._id}`, prod)
                    .then(response => response.data);
            }
           

        };
    });

}(window.angular));


