var middlewares = require('express').Router(),
    util = require('util');

middlewares.use(function(req, res, next) {
    console.log("[API] Request " + req.method + " " + req.url + " : " + util.inspect(req.body) );
    next();
});

module.exports = middlewares;