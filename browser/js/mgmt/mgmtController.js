app.controller('mgmtCtrl', ($scope, $state, products, $stateParams, $rootScope,orderServices, orders) => {
  $scope.products = products;
  $scope.orders = orders.orders;
  $scope.orderItems = orders.items;

  $scope.fullOrders = function(){
    $scope.products.forEach(prod => {
      var temp = _.where($scope.orderItems, {product_sku: prod._id});
      temp.map(t => t.name = prod.name);
    })
    $scope.orders.map(or => {
      or.items = _.where($scope.orderItems, {order_id: or._id});
    });
  }

  $scope.fullOrders();

});