var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var modelStock = require('../DB/models/modelStock');
require('util').inspect.defaultOptions.depth = null


/* GET home page. */
/**
 * @swagger
 * definitions:
 *   modelStock:
 *     properties:
 *       lastName:
 *         type: string
 *         example: Clement
 *       firstName:
 *         type: string
 *         example: Deproost
 *       age:
 *         type: integer
 *         example: 23
 *       gender:
 *         type: string
 *         example: Femme
 *       emergencyNumber:
 *         type: integer
 *         example: 0102030405
 *       allergies:
 *         type: string
 *         example: aucune
 *       medicalHistory:
 *         type: string
 *         example: Autisme, Gill de la tourette.
 *       bloodType:
 *         type: string
 *         example: A+
 *       socialNumber:
 *         type: integer
 *         example: 854237589204
 *       treatments:
 *         type: string
 *         example: On ne peut rien faire pour lui.
 *       organDonation:
 *         type: string
 *         example: OUI
 *       doctor:
 *         type: string
 *         example: Dr.Chopin
 */
/**
 * @swagger
 * /api/stock:
 *   get:
 *     summary: List all JSON patient informations.
 *     description: Returns a List of all patient informations in patientInformation collection.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelStockResponse'
 *       500:
 *         description: ERROR
 */
router.get('/', function(req, res, next) {

        try
        {
                var o_dbCRUD;

        	o_dbCRUD = new dbCRUD();
                console.log("TEST : READ COLLECTION");
        	o_dbCRUD.readCollection("HealthSafe", "PatientInformation", function(result, err) {
                        if(err)
                        {
                                console.log(err.stack);
                                return res.status(500).send(err.stack);
                        }
                        else
                        {
                                // displaying in console json
                                console.log(result);

                                console.log("END TEST : READ COLLECTION");

                                return res.status(200).send(result);
                                // or without return
                        }
                })

        }
        catch(err)
        {
                console.log(err.stack);
                return res.status(500).send(err.stack);
        }
        // var o_dbCRUD;
        //
	// o_dbCRUD = new dbCRUD();
        // console.log("TEST : READ COLLECTION");
	// o_dbCRUD.readCollection("HealthSafe", "PatientInformation", function(result) {
	// 	// displaying in console json
	// 	console.log(result);
        //
        //         console.log("END TEST : READ COLLECTION");
        //
	// 	res.status(200).send(result).end();
	// });
  //res.status(200).end();

})

/**
 * @swagger
 * definitions:
 *   modelStockResponse:
 *     properties:
 *       _id:
 *         type: string
 *         example: 5ddc5f4fb5193a346de246a0
 *       lastName:
 *         type: string
 *         example: Clement
 *       firstName:
 *         type: string
 *         example: Deproost
 *       age:
 *         type: integer
 *         example: 23
 *       gender:
 *         type: string
 *         example: Femme
 *       emergencyNumber:
 *         type: integer
 *         example: 0102030405
 *       allergies:
 *         type: string
 *         example: aucune
 *       medicalHistory:
 *         type: string
 *         example: Autisme, Gill de la tourette.
 *       bloodType:
 *         type: string
 *         example: A+
 *       socialNumber:
 *         type: integer
 *         example: 854237589204
 *       treatments:
 *         type: string
 *         example: On ne peut rien faire pour lui.
 *       organDonation:
 *         type: string
 *         example: OUI
 *       doctor:
 *         type: string
 *         example: Dr.Chopin
 */
/**
 * @swagger
 * /api/stock:
 *   post:
 *     summary: Add patient Information into UserConnexion patientInformation collection.
 *     description: After send a JSON in body, Returns a JSON added.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelStock'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelStockResponse'
 *       500:
 *         description: ERROR
 */
router.post('/', function(req, res, next) {
        try
        {
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
                                if(err)
                                {
                                        console.log(err.stack);
                                        return res.status(500).send(err.stack);
                                }
                                else
                                {
                                        console.log("TEST : ADD FOR INFORMATIONS");
                                        console.log(result);
                                        console.log("END TEST : ADD FOR INFORMATIONS");

                                        return res.status(200).send(result._id);
                                }
                                // console.log("TEST : ADD FOR INFORMATIONS");
                                // console.log(result);
                                // console.log("END TEST : ADD FOR INFORMATIONS");
                                //
                                // res.status(200).send(result._id).end();
                        });
        }
        catch(err)
        {
                console.log(err.stack);
                return res.status(500).send(err.stack);
        }
        // const stock = new modelStock(
        //         {
        //                 lastName: req.body.lastName,
        //                 firstName: req.body.firstName,
        //                 age: req.body.age,
        //                 gender: req.body.gender,
        //                 emergencyNumber : req.body.emergencyNumber,
        //                 allergies: req.body.allergies,
        //                 medicalHistory: req.body.medicalHistory,
        //                 bloodType: req.body.bloodType,
        //                 socialNumber: req.body.socialNumber,
        //                 treatments: req.body.treatments,
        //                 organDonation: req.body.organDonation,
        //                 doctor: req.body.doctor
        //
        //         }).save(function(err, result){
        //                 //if (err)
        //                 //         res.status(400).send(err);
        //                 console.log("TEST : ADD FOR INFORMATIONS");
        //                 console.log(result);
        //                 console.log("END TEST : ADD FOR INFORMATIONS");
        //
        //                 res.status(200).send(result._id).end();
        //         });

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
