var express = require('express');
var router = express.Router();
var userConnection = require('../DB/models/modelConnection');
// var mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
// var CreateTest = require('../DB/tools/dbCRUD');
// var CreateTest2 = require('../DB/tools/dbCRUD').CreateTest2;
// var Test = require('../DB/tools/dbCRUD').CreateTest;
// var Test2 = require('../DB/tools/dbCRUD').CreateTest2;
// var manage = require('../DB/tools/dbCRUD').manage;
var obj = require('../DB/Controllers/dbCRUD');
var url = require('../DB/config/dbCreationAndConnection');

const swaggerJSDoc = require('swagger-jsdoc');






router.get("/", function(req, res, next) {

// HealthSafe
        var o_dbCreation;
        o_dbCreation = new dbCreation();


        o_dbCreation.createDB("T".toString(), function(result) {
                console.log("TEST : Create BDD");
                console.log(result);
                console.log("END TEST : CREATE DB");

        });

        o_dbCreation.displayDatabases("TEST_DELIVERY".toString(), function(result) {
                console.log("TEST : CREATE COLLECTION");

                o_dbCreation.createColl("T".toString(), "modelstock", function(result) {
                        o_dbCreation.createDB("T".toString(), function(result) {
                                console.log(result);
                        });
                        console.log(result);
                });
                console.log(result);
                o_dbCreation.displayAllCollections("HealthSafe");
                console.log("END TEST : CREATE COLLECTION");
        })

        res.render('index', {title : "TEST"});

})





router.get('/signup', function(req, res, next) {

  console.log("REQ.BODY.USERNAME = " + req.body.userName);
  res.render('index', { title: 'Express' });

  //console.log("REQ.BODY : " + req.body);

  res.status(200);
});

router.post('/signup', async function(req, res) {
        //res.setHeader('Content-Type', 'application/json');

        console.log("REQ : " + req);
        const user = new userConnection(
                {
                        userName: req.body.userName,
                        password: req.body.password
                }).save(function(err, response){
                        //if (err)
                        //         res.status(400).send(err);
                        // res.status(200).send(response);
                        res.status(200);
                        //res.json({ userName: req.body.userName });
                });
                return res.json({ userName: req.body.userName, password: req.body.password }); //userName.toAuthJSON()

});

// router.post('/signup/:id', async function(req, res) {
//         //res.setHeader('Content-Type', 'application/json');
//
//         console.log("REQ : " + req);
//         const user = new userConnection(
//                 {
//                         userName: req.body.userName
//                 }).save(function(err, response){
//                         //if (err)
//                         //         res.status(400).send(err);
//                         // res.status(200).send(response);
//                         res.status(200);
//                         //res.json({ userName: req.body.userName });
//                 });
//                 return res.json({ userName: req.body.userName }); //userName.toAuthJSON()
//
// });

module.exports = router;
