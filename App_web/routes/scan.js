var express = require('express');
var router = express.Router();

/* GET scan page */
router.get('/', function(req, res, next){
  res.render('scan', { title: 'Express' });
});

module.exports = router;
