//faire une route simple qui reçoit un json donc une methode GET
//si le json est reçu on envoie une reponse 200
var express = require('express');
var router = express.Router();

/* POST method to get data from front */
router.post('/authJson', function(req, res, next) {
  //console.log(req.body.username);
  //console.log(req.body.password);
  res.end();
});

module.exports = router;
