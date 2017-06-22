'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Order = mongoose.model('Order');
var Order_item = mongoose.model('OrderItem');


//get all orders & items
router.get('/', (req, res, next) => {
  // if(req.user){
    Order.find()
    .then(orders =>{
      Order_item.find()
        .then(order_items => {
            res.send({orders: orders, items: order_items});
        })
    })
    .then(null, next);
  // };
});


//create one
router.post('/', (req, res, next) => {
  req.body.order.date_created = Date.now();
  console.log('before', req.body.order);

  // Order.create(req.body.order)
  //   .then(ord => res.status(201).send(ord))
  //   .then(null, next);
  var order = req.body.order;
  var order_items = req.body.order_items;
  Order.create(order)
  .then(ord => {
      console.log('order made', ord);
      // create each order_item product
      var count = order_items.length;

      for(var i = 0; i < count; i++) order_items[i].order_id = ord;
    
      Order_item.create(order_items)
      .then(items => {
        console.log(items);
        res.status(201).send(ord);
      })
      .then(null, next);

      // res.send(201).send(ord);
    })
    //create order_itmes
  .then(null, next);

});

function createOrderItems(order, items){
  var count = items.length;

  for(var i = 0; i < count; i++) items[i].order_id = order._id;
    
  console.log('items', items, order);

  return Order_item.createAsynch(items);


}

// router.put('/:productId', (req,res,next) =>{
//   if(req.user){
//     _.assign(req.product, req.body);
//     req.product.save()
//       .then(prod => res.status(200).send(prod))
//       .then(null, next);
//   } next();
// });

// router.delete('/:productId', (req, res, next) => {
//   if(req.user){
//     Product.remove({_id:req.product._id}).exec()
//       .then(removed => res.status(200).send(removed))
//       .then(null, next);
//   } next();
// })

