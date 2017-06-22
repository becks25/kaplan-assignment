

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Order_item = Promise.promisifyAll(mongoose.model('OrderItem'));


User.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Order.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Product.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Order_item.remove({}, function(err, removed) {
  if (err) console.log(err);
});

var seedUsers = function () {

    var users = [
        {
            email: 'manager@mgmt.com',
            password: 'password'
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function(){

    var products = [
        {
            name: 'oranges',
            quantity: 10,
            unit_price: 0.5
        },
        {
            name: 'bananas',
            quantity: 10,
            unit_price: 0.4
        },
        {
            name: 'pineapples',
            quantity: 10,
            unit_price: 0.7
        }
    ];

    return Product.createAsync(products);
}

var seedOrders = function(){

    var orders = [
        {
            amount: 8,
            created_date: Date.now()
        }
    ];

    return Order.createAsync(orders);
}

var seedOrderItems = function(products, orders){

    var orderItems = [
        {
            sold_quantity: 2,
            unit_price: products[0].unit_price,
            product_sku: products[0]._id,
            order_id: orders[0]._id
         },
        {
            sold_quantity: 1,
            unit_price: products[1].unit_price,
            product_sku: products[1]._id,
            order_id: orders[0]._id
        },
        {
            sold_quantity: 1,
            unit_price: products[3].unit_price,
            product_sku: products[3]._id,
            order_id: orders[0]._id
         }

    ]
}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        var prods;
        return seedUsers()
        .then(function(users){
            return seedProducts(function(products){
                prods = products;
                return seedOrders()
                .then(function(orders){
                    return seedOrderItems(prods, orders)
                        .then(function(items){
                            return items;
                        })
                })
            })
        })
        
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
