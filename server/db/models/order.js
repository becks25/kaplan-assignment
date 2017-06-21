'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    order_id: {
        type: Number,
        unique: true
    },
    amount: {
        type: Number
    },
    date_created: {
        type: Date
    }
});


mongoose.model('Order', schema);