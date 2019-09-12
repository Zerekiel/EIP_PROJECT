var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/tools/dbCRUD').dbCRUD;
var userConnection = require('../DB/models/modelConnection');
var mongo = require('mongodb')


/* GET home page. */
router.get('/', function(req, res, next) {
	var o_dbCRUD;

	o_dbCRUD = new dbCRUD();

	o_dbCRUD.readCollection("HealthSafe", "userconnections", function(result) {
		// displaying in console json
		console.log(result);
		res.status(200).send(result);

	});

})
//
// router.post('/', function(req, res, next) {
// });

router.post('/test', async function(req, res) {
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

router.delete('/test/:id', async function(req, res) {
	console.log("TEST DELETE");
	// const user = new userConnection(
	// 	{
	// 		userName: req.body.userName
	// 		// password: req.body.password
	// 	})
	o_dbCRUD = new dbCRUD();
	console.log("TEST DELETE2");
	console.log(req.params.id);
	var id = req.params.id;//'{ "_id" : ObjectId("${req.params}") }';
	//var myQuery = '{ "_id" : ObjectId("' + id + '") }';
	//var myQuery = '{ "_id" : "' + id + '" }';
	var myQuery = { _id: new mongo.ObjectId(id) };
	console.log(myQuery);
	o_dbCRUD.deleteInfo("HealthSafe", "userconnections", myQuery, function(req, res) {
		console.log("TESST DELETE FUNCTION");
		res.json({ success: id })

	});
	console.log("END TEST DELETE");

	res.status(200);

})

// router.delete('/test/', async function(req, res) {
// 	console.log("TEST DELETE");
// 	const user = new userConnection(
// 		{
// 			userName: req.body.userName
// 			// password: req.body.password
// 		})
// 	o_dbCRUD = new dbCRUD();
// 	console.log("TEST DELETE2");
// 	console.log(req.param);
// 	o_dbCRUD.deleteInfo("HealthSafe", "userconnections", user, function(req, res) {
// 		console.log("TESST DELETE FUNCTION");
// 		res.status(200);
//
// 	});
// 	console.log("END TEST DELETE");
//
// 	res.status(200);
//
// })
module.exports = router;
