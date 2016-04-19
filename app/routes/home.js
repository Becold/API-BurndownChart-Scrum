var router = require('express').Router(),
    _ = require('lodash');

// Routes
router.route('/')
  .get(function(req, res) {
    res.send('Hello World');
  });

module.exports = router;