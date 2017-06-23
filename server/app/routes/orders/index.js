'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Order = mongoose.model('Order');
var Order_item = mongoose.model('OrderItem');

//get all orders & items
router.get('/', (req, res, next) => {
    Order.find()
    .then(orders =>{
      Order_item.find()
        .then(order_items => {
            res.send({orders: orders, items: order_items});
        })
    })
    .then(null, next);
});


//create one
router.post('/', (req, res, next) => {
  req.body.order.date_created = Date.now();

  Order.create(req.body.order)
  .then(ord => {

      //create individual order items
      createOrderItems(ord, req.body.order_items)
      .then(items => {
        res.status(201).send(ord)
      })
      .then(null, next);
    })
  .then(null, next);

});

function createOrderItems(order, items){
  var count = items.length;
  for(var i = 0; i < count; i++) items[i].order_id = order._id;
  return Order_item.create(items);
}






