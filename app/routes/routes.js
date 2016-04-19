var router = require('express').Router();

// Models
var Sprint = require('../models/sprint');
var Story = require('../models/story');

// Routes
router.route('/')
  .get(function(req, res) {
    res.send('Hello World');
  });

module.exports = router;