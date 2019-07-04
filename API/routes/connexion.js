var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({
  message : "CONNEXION / LOGIN",
  login : "",//req.body.nom,
  password : "",//req.body.ville
  login2 : req.body.login,
  password2 : req.body.password,
  methode : req.method
  })
})

.post('/', function(req, res, next) {
        res.json({
        message : "CONNEXION / LOGIN",
        login : req.body.login,
        password : req.body.password,
        methode : req.method
        })
});

// console.log(req.header('Content-Type'))
//     console.log(req.body.username);
//     console.log(req.body.password);
//     console.log(req.body.email);

module.exports = router;
