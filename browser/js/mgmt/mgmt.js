app.config(function ($stateProvider) {
    $stateProvider.state('mgmt', {
        url: '/manage',
        templateUrl: 'js/mgmt/mgmt.html',
        resolve: {
            products: (productServices) => productServices.getProducts(),
            orders: (orderServices) => orderServices.getOrders()
        },
        controller: 'mgmtCtrl'
    });
});