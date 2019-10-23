var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Express' });
});

module.exports = router;
