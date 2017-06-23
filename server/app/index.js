'use strict';
var path = require('path');
var express = require('express');
var app = express();
module.exports = app;

// Pass express application pipeline into the configuration
require('./configure')(app);

app.use('/api', require('./routes'));

//protect against urls that look like file extensions
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
