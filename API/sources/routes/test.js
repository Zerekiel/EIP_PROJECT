var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var userConnection = require('../DB/models/modelConnection');
var mongo = require('mongodb')
require('util').inspect.defaultOptions.depth = null


/* GET home page. */
router.get('/', function(req, res, next) {
	var o_dbCRUD;

	o_dbCRUD = new dbCRUD();

	o_dbCRUD.readCollection("HealthSafe", "userconnections", function(result) {
		// displaying in console json
		console.log(result);

		res.status(200).send(result).end();
	});

})

router.post('/test', async function(req, res) {
        //res.setHeader('Content-Type', 'application/json');

        const user = new userConnection(
                {
                        userName: req.body.userName,
                        password: req.body.password
                }).save(function(err, response){
                        //if (err)
                        //         res.status(400).send(err);
                        res.status(200).end();
                });

                return res.json({ userName: req.body.userName, password: req.body.password });
});


router.delete('/test/:id', async function(req, res) {
	o_dbCRUD = new dbCRUD();

	var id = req.params.id;
	var myQuery = { _id: new mongo.ObjectId(id) };
	console.log("TEST : DELETE BY ID");

	o_dbCRUD.deleteInfo("HealthSafe", "userconnections", myQuery, function(req, res) {
		// Todo
		console.log("END TEST : DELETE BY ID");

	});

	res.status(200).send(id);

})

router.put('/test/:id', async function(req, res) {

	o_dbCRUD = new dbCRUD();

	var id = req.params.id;
	var myQuery = { _id: new mongo.ObjectId(id) };
	var dataToChange = {$set:req.body};

	o_dbCRUD.updateOneInfo("HealthSafe", "userconnections", myQuery, dataToChange, function(result, err) {
		if (err)
		{
			console.log("Error: ", err);
			res.status(400).send("Error");
		}
		else
		{
			console.log("TEST : UPDATE BY ID");

			console.log(result.value);
			console.log("END TEST : UPDATE BY ID");

			res.status(200).send(result.value);
		}

		//res.status(200).send(result.value);
	})

	//res.status(200).send(id).end();
});

module.exports = router;
