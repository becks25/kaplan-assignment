app.controller('clientCtrl', ($scope, $state, products, $stateParams, $rootScope,orderServices) => {
  $scope.products = products;
  $scope.total = 0;
  $scope.error = false;
  $scope.success = false;
  $scope.uploadFile;

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

    if(up.files[0]){
      console.log($scope.uploadFile);
      var reader = new FileReader();
          reader.readAsText(up.files[0]);
          console.log(reader);

          reader.onload = function(event) {
                var csvData = event.target.result;
                var data = csvData.split(/\n/);
                var titles = data[0].split(',');
                var total = 0;

                for(var i = 1; i< data.length; i++){
                  var curr = data[i].split(',');

                  var temp = {
                    sold_quantity: curr[0]
                  }

                  //find out sku & unit_price
                  var prod =  _.where($scope.products, {name: curr[1].toLowerCase()});

                  if(prod[0]){
                    temp.unit_price = prod[0].unit_price;
                    temp.product_sku = prod[0]._id;
                    $scope.total += temp.unit_price * temp.sold_quantity;
                    order_items.push(temp);
                  }
                  //if item isn't found, it isn't added to the order

                }

                order.amount= $scope.total;
                //send order req
                orderServices.createOrder(order, order_items)
                  .then(function(res){
                    //reset everything & show success message
                    $scope.resetForm();
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

});