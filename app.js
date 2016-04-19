var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    router = require('./app/routes/routes'),
    middlewares = require('./app/routes/middlewares');

// Cfg
app.use(bodyparser.urlencoded({"extended" : false}));
app.use(bodyparser.json());
app.use('/', middlewares);
app.use('/', router);

// Init
db = require('./app/lib/database').init();
app.listen(3000);

