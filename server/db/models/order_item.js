'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    sold_quantity: Number,
    unit_price: Number,
    product_sku:{
        type: Schema.Types.ObjectId, 
        ref: 'Product',
        unique: false
    },
    order_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Order',
        unique: false
    }
});


mongoose.model('OrderItem', schema);