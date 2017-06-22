(function (angular) {
    'use strict';

    var module = angular.module('orderServices', []);

    module.service('orderServices', function ($http, productServices) {
        
        return {

            createOrder: function(order, items){
                return $http.post(`api/orders`, {order: order, order_items: items})
                    .then(response => {

                        items.forEach(i => {
                            productServices.updateProduct(i);
                        });

                        return response.data
                    })
            },

            getOrders: function(){
                return $http.get(`api/orders`)
                    .then(response => response.data);
            }
           

        };
    });

}(window.angular));


