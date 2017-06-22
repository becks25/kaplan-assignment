'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    amount: Number,
    date_created: Date
    
});


mongoose.model('Order', schema);