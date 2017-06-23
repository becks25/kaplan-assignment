app.controller('clientCtrl', ($scope, $state, products, $stateParams, $rootScope,orderServices) => {
  $scope.products = products;
  $scope.total = 0;
  $scope.error = false;
  $scope.success = false;

  //initialize order settings
  $scope.resetForm = function(){
    $scope.products.forEach(prod => prod.order = '0');
    $scope.error = false;
  }

  $scope.resetForm();

  $scope.getNumber = function(num) {
    return new Array(num);   
  }

  //every time the order changes, the running total should too
  $scope.updateTotal = function(){
    var total = 0;

    $scope.products.forEach(prod => total += prod.order*prod.unit_price);
    $scope.total = total;
  }

  $scope.submit = function(){
    $scope.error = false;

    //make sure at least one item has been selected
    if($scope.total == 0){
      $scope.error = true;
      return;
    }
    var order = {
      amount: $scope.total
    };

    var order_items = [];

    $scope.products.forEach(prod => {
      if(prod.order > 0){
        var temp = {
          sold_quantity: prod.order,
          unit_price: prod.unit_price,
          product_sku: prod._id
        };
        order_items.push(temp);
      }
    });

    //send order req
    orderServices.createOrder(order, order_items)
      .then(function(res){
        //reset everything & show success message
        $scope.resetForm();
        $scope.success = true;
      });
  }

});