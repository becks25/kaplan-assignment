'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

router.use(function (req, res) {
    res.status(404).end();
});
