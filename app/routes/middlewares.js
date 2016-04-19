var util = require('util');

middlewares = {
    onRequest: function(req, res, next) {
        console.log("[API] Request " + req.method + " " + req.url + " : " + util.inspect(req.body) );

        next();
    },
    allowCrossDomain: function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    }
};

module.exports = middlewares;