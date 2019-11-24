var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var modelStock = require('../DB/models/modelStock');
require('util').inspect.defaultOptions.depth = null


/* GET home page. */
router.get('/', function(req, res, next) {

        var o_dbCRUD;

	o_dbCRUD = new dbCRUD();
        console.log("TEST : READ COLLECTION");
	o_dbCRUD.readCollection("HealthSafe", "PatientInformation", function(result) {
		// displaying in console json
		console.log(result);

                console.log("END TEST : READ COLLECTION");

		res.status(200).send(result).end();
	});
  //res.status(200).end();

})

router.post('/', function(req, res, next) {
        const stock = new modelStock(
                {
                        lastName: req.body.lastName,
                        firstName: req.body.firstName,
                        age: req.body.age,
                        gender: req.body.gender,
                        emergencyNumber : req.body.emergencyNumber,
                        allergies: req.body.allergies,
                        medicalHistory: req.body.medicalHistory,
                        bloodType: req.body.bloodType,
                        socialNumber: req.body.socialNumber,
                        treatments: req.body.treatments,
                        organDonation: req.body.organDonation,
                        doctor: req.body.doctor

                }).save(function(err, result){
                        //if (err)
                        //         res.status(400).send(err);
                        console.log("TEST : ADD FOR INFORMATIONS");
                        console.log(result);
                        console.log("END TEST : ADD FOR INFORMATIONS");

                        res.status(200).send(result._id).end();
                });

                // return res.json({ lastName: req.body.lastName,
                // firstName: req.body.firstName,
                // age: req.body.age,
                // gender: req.body.gender,
                // emergencyNumber : req.body.emergencyNumber,
                // allergies: req.body.allergies,
                // medicalHistory: req.body.medicalHistory,
                // bloodType: req.body.bloodType,
                // socialNumber: req.body.socialNumber,
                // treatments: req.body.treatments,
                // organDonation: req.body.organDonation,
                // doctor: req.body.doctor });
});

module.exports = router;
