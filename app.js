var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    router = require('./app/routes/routes'),
    middlewares = require('./app/routes/middlewares');

// Cfg
app.use(bodyparser.urlencoded({"extended" : false}));
app.use(bodyparser.json());
app.use(middlewares.allowCrossDomain);
app.use(middlewares.onRequest);
app.use('/', router);

// Init
db = require('./app/lib/database').init();
app.listen(3000, function() {
    console.log("[API] L'api ecoute sur le port 3000.");
});

