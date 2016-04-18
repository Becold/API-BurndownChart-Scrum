var router = require('express').Router();

// Models
// Todo.

// Routes
router.route('/')
  .get(function(req, res) {
    res.send('Hello World');
  });

module.exports = router;