var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({
  message : "Ajoute un nouveau patient à la liste",
  message2 : req.body.nom
  })
})

.post('/', function(req, res, next) {
});

module.exports = router;
