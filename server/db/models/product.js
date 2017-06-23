'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sku: Number,
    name: String,
    quantity: Number,
    unit_price: Number
});


mongoose.model('Product', schema);