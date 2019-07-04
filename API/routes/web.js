var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({
  message : "Ajoute un nouveau patient à la liste",
  nom : "Dont",//req.body.nom,
  ville : "PanicIts",//req.body.ville,
  taille : "170", //req.body.taille,
  methode : req.method
  })
})

.post('/', function(req, res, next) {
     	console.log(req);
     	console.log(req.query.nom);
        res.json({
        message : req.body.nom,
        nom : req.query.nom,
        ville : req.query.ville,
        taille : req.query.taille,
        methode : req.method
        })
});

 	// console.log(req.header('Content-Type'))
    	// console.log(req.body.username);
     // console.log(req.body.password);
     // console.log(req.body.email);

module.exports = router;
