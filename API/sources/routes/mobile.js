var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({
  message : "Ajoute un nouveau patient à la liste",
  nom : "Dont ",//req.body.nom,
  ville : "Panic Its ",//req.body.ville,
  taille : "Organic", //req.body.taille,
  methode : req.method
  })
})

.post('/', function(req, res, next) {
        res.json({
        message : "Ajoute un nouveau patient à la liste",
        nom : req.body.nom,
        ville : req.body.ville,
        taille : req.body.taille,
        methode : req.method
        })
});

// console.log(req.header('Content-Type'))
//     console.log(req.body.username);
//     console.log(req.body.password);
//     console.log(req.body.email);

module.exports = router;
