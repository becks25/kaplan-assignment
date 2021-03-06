app.controller('mgmtCtrl', ($scope, $state, products, $stateParams, $rootScope,orderServices, orders, productServices) => {
  $scope.products = products;
  $scope.orders = orders.orders;
  $scope.orderItems = orders.items;
  $scope.newProduct = {};
  $scope.error = false;
  $scope.success = false;

  $scope.fullOrders = function(){
    //map out all orders & products
    $scope.products.forEach(prod => {
      var temp = _.where($scope.orderItems, {product_sku: prod._id});
      temp.map(t => t.name = prod.name);
    })

    $scope.orders.map(or => or.items = _.where($scope.orderItems, {order_id: or._id}));
  }

  $scope.fullOrders();

  $scope.saveNew = function(){
    $scope.error = false;

    //make sure that all fields are present
    if($scope.newProduct.name && $scope.newProduct.quantity && $scope.newProduct.unit_price){
      productServices.createProduct($scope.newProduct)
        .then(res => {
          $scope.products.push(res);
          $scope.newProduct = {};
          $scope.success = true;
        });
    }else{
      $scope.error = true;
      return
    }
  }

  $scope.deleteProduct = function(p){
    productServices.deleteProduct(p)
      .then(res => $state.reload())
  }

  $scope.updateProd = function(p){
    productServices.updateProduct(p)
      .then(res => p.edit = false);
  };

});