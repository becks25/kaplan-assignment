'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    order_item_id: {
        type: Number,
        unique: true
    },
    sold_quantity: {
        type: Number
    },
    unit_price: {
        type: Number
    },
    product_sku:{
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    },
    order_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Order'
    }
});


mongoose.model('Order_item', schema);