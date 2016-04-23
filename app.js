var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    middlewares = require('./app/routes/middlewares');

// Cfg
require('dotenv').config();

app.use(bodyparser.urlencoded({"extended" : false}));
app.use(bodyparser.json());
var routes = {
    home: require('./app/routes/home'),
    sprint:  require('./app/routes/sprint')
};

// Middlewares
app.use(middlewares.allowCrossDomain);
app.use(middlewares.onRequest);

// Routes
app.use('/', routes.home);
app.use('/', routes.sprint);

// Init
db = require('./app/lib/database').init();
app.listen(3000, function() {
    console.log("[API] L'api ecoute sur le port 3000.");
});

