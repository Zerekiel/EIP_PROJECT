var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/tools/dbCRUD').dbCRUD;
var userConnection = require('../DB/models/modelConnection');
require('util').inspect.defaultOptions.depth = null


//var connectionController = require('../DB/controllers/connectionController');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.json({
  // message : "CONNEXION",
  // login : req.query.login,
  // password : req.query.password,
  // login2 : req.query.login,
  // password2 : req.query.password,
  // methode : req.method
  // })
  // console.log(req.query.login);
  // console.log(req.query.password);

  var o_dbCRUD;

  o_dbCRUD = new dbCRUD();

  o_dbCRUD.readCollection("HealthSafe", "userconnections", function(result) {
          console.log("TEST : READ COLLECTION");
          // displaying in console json
          console.log(result);

          console.log("END TEST : READ COLLECTION");

          res.status(200).send(result).end();
  });

 //res.status(200);
})

router.post('/', function(req, res, next) {
        // res.json({
        // message : "CONNEXION",
        // login : req.query.login,
        // password : req.query.password,
        // methode : req.method
        // })
        // console.log(req.query.login);
        // console.log(req.query.password);


        console.log("TEST : ADD USER IN DB WITH JSON RECEIVE");
        const user = new userConnection(
                {
                        userName: req.body.userName,
                        password: req.body.password
                }).save(function(err, result){
                        //if (err)
                        //         res.status(400).send(err);
                        console.log(result);
                        console.log("END TEST : ADD USER IN DB WITH JSON RECEIVE");

                        res.status(200).end();

                });
        //console.log("END TEST : ADD USER IN DB WITH JSON RECEIVE");
                return res.json({ userName: req.body.userName, password: req.body.password });
});

module.exports = router;
