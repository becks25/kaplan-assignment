'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sku: {
        type: Number
    },
    name: {
        type: String
    },
    quantity:{
        type: Number
    },
    unit_price:{
        type: Number
    }
});


mongoose.model('Product', schema);