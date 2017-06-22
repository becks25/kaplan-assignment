'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Order = mongoose.model('Order');
var Order_item = mongoose.model('Order_item');


//get all orders & items
router.get('/', (req, res, next) => {
  if(req.user){
    Order.find()
    .then(orders =>{
      Order_item.find()
        .then(order_items => {
            res.send({orders: orders, items: order_items});
        })
    })
    .then(null, next);
  } next();
});


//create one
router.post('/', (req, res, next) => {
  Order.create(req.body.order)
  .then(order => {
    //create order_itmes
    //update products
  })
  .then(null, next);

});

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

