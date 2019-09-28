var express = require('express');
var router = express.Router();
var userConnection = require('../DB/models/modelConnection');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var CreateTest = require('../DB/tools/dbCRUD');
var CreateTest2 = require('../DB/tools/dbCRUD').CreateTest2;
var Test = require('../DB/tools/dbCRUD').CreateTest;
var Test2 = require('../DB/tools/dbCRUD').CreateTest2;
// var manage = require('../DB/tools/dbCRUD').manage;
var obj = require('../DB/tools/dbCRUD');
var url = require('../DB/config/dbCreationAndConnection');
// var userPostConnectionSchema = require('../DB/models/post.modelConnection')

/* GET home page. */
// router.get('/', function(req, res, next) {
//         //res.setHeader('Content-Type', 'application/json');
//         //CreateTest();
//
//
//         console.log(CreateTest(res));
//
//
//         //CreateTest();
//         //console.log(CreateTest());
//         // var t = JSON.stringify(CreateTest(), null, 4);
//         // console.log(t);
//
//
//          res.json(CreateTest());
//         res.end(JSON.stringify(CreateTest(),    null, 3));
//
//
//   //res.render('index', { title: 'Express' });
//   //console.log(CreateTest());
//   // console.log("REQ : " + req);
//   // console.log("REQ.BODY : " + req.body);
//
//
//   console.log("URLDB = " + url);
//
//
//   // MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   // if (err) throw err;
//   // var dbo = db.db("HealthSafe");
//   // dbo.collection("userconnections").find({}).toArray(function(err, result) {//.findOne({}, function(err, result) {
//   //   if (err) throw err;
//   //   console.log(result);
//   //   db.close();
//   // CreateTest();
//   // });
//
//
//   res.status(200);
//
//
// });



const dbCreation = require('../DB/tools/dbCreation').dbCreation;

router.get("/", function(req, res, next) {

        var o_dbCreation;
        o_dbCreation = new dbCreation();

        o_dbCreation.createDB("FFR2".toString(), function(result) {
                console.log(result);
        });


        o_dbCreation.displayDatabases("FFR2".toString(), function(result) {
                o_dbCreation.createColl("FFR2".toString(), "TESTCOOLLLL", function(result) {
                        o_dbCreation.createDB("FFR2".toString(), function(result) {
                                console.log(result);
                        });
                        console.log(result);
                });
                console.log(result);
                o_dbCreation.displayAllCollections("FFR2");
        })

        res.end();
})





// router.get('/signup', function(req, res, next) {
//
//   console.log("REQ.BODY.USERNAME = " + req.body.userName);
//   res.render('index', { title: 'Express' });
//
//   //console.log("REQ.BODY : " + req.body);
//
//   res.status(200);
// });

// router.get('/', function(res, req) {});

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
