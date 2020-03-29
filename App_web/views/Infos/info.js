var express = require('express');
var router = express.Router();

/* GET info page */
router.get('/', function(req, res, next){
  res.render('info', { title: 'Express', user_name: 'Paul ROUILLARD'/*res.body.first_name + ' '+ stock.last*/, user_dateOfBirth: '04/03/1997', user_profession: 'student',
                      user_address:'Paris', user_height: '1.78', user_weight :'85' + 'Kg'});
});

module.exports = router;
