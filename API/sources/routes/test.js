var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/tools/dbCRUD').dbCRUD;

/* GET home page. */
router.get('/', function(req, res, next) {
	var o_dbCRUD;

	o_dbCRUD = new dbCRUD();

	o_dbCRUD.readCollection("HealthSafe", "userconnections", function(result) {
		console.log(result);
		res.status(200).send(result);

	});

})

router.post('/', function(req, res, next) {
});

module.exports = router;
