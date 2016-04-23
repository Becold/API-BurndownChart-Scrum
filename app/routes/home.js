var router = require('express').Router();

// Routes
router.route('/')
  .get(function(req, res) {

    res.json({success: false, reason: "Hello world"});

  });

module.exports = router;