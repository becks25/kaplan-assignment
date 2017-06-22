'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var _ = require('lodash');
var Product = mongoose.model('Product');


//get all products
router.get('/', (req, res, next) => {
    Product.find()
    .then(products => res.send(products))
    .then(null, next);
});


//get one
router.get('/:name', (req, res, next) => {
    res.send(req.product);
});

//create one
router.post('/', (req, res, next) => {
  if(req.user){
      console.log(req.user);
      Product.create(req.body)
        .then(prod => res.status(201).send(prod))
        .then(null, next);
  } next();
});

router.put('/:productId', (req,res,next) =>{

  //when someone makes a purchase, the product inventory should update
  if(req.body.prod.sold_quantity){
    Product.findOne({_id: req.body.prod.product_sku})
    .then(prod => {
      prod.quantity -= req.body.prod.sold_quantity;
      prod.save()
        .then(p => res.status(200).send(p));
    })
  }else{
    _.assign(req.product, req.body);
    req.product.save()
      .then(prod => res.status(200).send(prod))
      .then(null, next);
    }
});

router.delete('/:productId', (req, res, next) => {
  if(req.user){
    Product.remove({_id:req.product._id}).exec()
      .then(removed => res.status(200).send(removed))
      .then(null, next);
  } next();
})

