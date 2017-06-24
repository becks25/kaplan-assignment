app.controller('clientCtrl', ($scope, $state, products, $stateParams, $rootScope,orderServices, productServices) => {
  $scope.products = products;
  $scope.total = 0;
  $scope.error = false;
  $scope.success = false;
  $scope.uploadFile;
  $scope.order_items = [];

  document.getElementById('orderUpload').addEventListener('change', $scope.upload, false);

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
    var up = document.getElementById('orderUpload');

    var order_items = [];
    var order = {};

    //if a file has been uploaded, process
    if(up.files[0]){
      var reader = new FileReader();
          reader.readAsText(up.files[0]);

          reader.onloadend = function(event) {
            
                var csvData = event.target.result;
                var data = csvData.split(/\n/);
                var titles = data[0].split(',');

                for(var i = 1; i< data.length; i++){
                    var curr = data[i].split(',');    
                    $scope.addItem(curr[1], curr[0]);
                };

                order.amount= $scope.total;
                    //send order req

                orderServices.createOrder(order, $scope.order_items)
                  .then(function(res){
                    //reset everything & show success message
                    up.value = '';
                    $scope.resetForm();
                    $scope.total = '0';
                    $scope.success = true;
                  });
        };

    }else{
      //make sure at least one item has been selected
      if($scope.total == 0){
        $scope.error = true;
        return;
      }

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

      order.amount= $scope.total;
      //send order req
      orderServices.createOrder(order, order_items)
        .then(function(res){
          //reset everything & show success message
          $scope.resetForm();
          $scope.success = true;
        });

    }
  }


$scope.addItem = function(name, num){
  var temp = {
    sold_quantity: num,
    name: name
  };

  $scope.products.forEach(p => {
    //remove any trailing characters
    var t = temp.name.slice(0, p.name.length);
      if(p.name.toLowerCase() == t.toLowerCase()){
        temp.unit_price = p.unit_price;
        temp.product_sku = p._id;
        $scope.total += temp.unit_price * temp.sold_quantity;
        $scope.order_items.push(temp);
      }
    });

}

});
