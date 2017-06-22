app.config(function ($stateProvider) {
    $stateProvider.state('client', {
        url: '/client',
        templateUrl: 'js/client/client.html',
        resolve: {
            products: (productServices) => productServices.getProducts()
        },
        controller: 'clientCtrl'
    });
});