var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({
  message : "CONNEXION",
  login : req.query.login,
  password : req.query.password,
  login2 : req.query.login,
  password2 : req.query.password,
  methode : req.method
  })
  console.log(req.query.login);
  console.log(req.query.password);
  res.status(200);
})

.post('/', function(req, res, next) {
        res.json({
        message : "CONNEXION",
        login : req.query.login,
        password : req.query.password,
        methode : req.method
        })
        console.log(req.query.login);
        console.log(req.query.password);
});

module.exports = router;
