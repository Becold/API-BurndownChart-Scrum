var middlewares = require('express').Router(),
    util = require('util');

middlewares.use(function(req, res, next) {
    console.log("[API] Body request: " + util.inspect(req.body) );
    next();
});

module.exports = middlewares;