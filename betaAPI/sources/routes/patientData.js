const express = require('express');
const router = express.Router();
const modelPatientData = require('../models/modelPatientData');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorPatientData = require('../controllers/validators/patientDataValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/**
 * @swagger
 * definitions:
 *   modelPatientData:
 *     properties:
 *       lastName:
 *         type: string
 *         example : OldBoy
 *       firstName:
 *         type: string
 *         example: ODeSu
 *       age:
 *         type: integer
 *         example : 20
 *       gender:
 *         type: enum
 *         example : ["Male", "Female"]
 *       height:
 *         type: integer
 *         example : 180
 *       weight:
 *         type: integer
 *         example : 80
 *       emergencyNumber:
 *             type: string
 *             example : [ '+33658893939', 0638495959, 0139384458]
 *       allergies:
 *         type: string
 *         example: codeine
 *       medicalHistory:
 *         type: string
 *         example: myopie
 *       bloodType:
 *         type: enum
 *         example : ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
 *       socialNumber:
 *         type: string
 *         example: 4231785432789243432
 *       treatments:
 *         type: string
 *         example: lunettes
 *       organDonation:
 *         type: boolean
 *         example: ["true", "false"]
 *       doctor:
 *         type: string
 *         example: Dr.Chopin
 */

 /**
  * @swagger
  * definitions:
  *   modelPatientDataRes:
  *     properties:
  *       _id:
  *         type: string
  *         example: 5ddc5f4fb5193a346de246a0
  *       lastName:
  *         type: string
  *         example : OldBoy
  *       firstName:
  *         type: string
  *         example: ODeSu
  *       age:
  *         type: integer
  *         example : 20
  *       gender:
  *         type: enum
  *         example : ["Male", "Female"]
  *       height:
  *         type: integer
  *         example : 180
  *       weight:
  *         type: integer
  *         example : 80
  *       emergencyNumber:
  *             type: string
  *             example : [ '+33658893939', 0638495959, 0139384458]
  *       allergies:
  *         type: string
  *         example: codeine
  *       medicalHistory:
  *         type: string
  *         example: myopie
  *       bloodType:
  *         type: enum
  *         example : ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  *       socialNumber:
  *         type: string
  *         example: 4231785432789243432
  *       treatments:
  *         type: string
  *         example: lunettes
  *       organDonation:
  *         type: boolean
  *         example: ["true", "false"]
  *       doctor:
  *         type: string
  *         example: Dr.Chopin
  */


/* GET Connexion page. */

/**
 * @swagger
 * /api/patientData:
 *   get:
 *     summary: Display patients' data.
 *     description: Returns a JSON List with patients' data registered in DB.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelPatientDataRes'
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             examples:
 *                '0':
 *                  value: error Need to be configured.
 */
router.get('/', async function(req, res) {
        const result = await ctrlRead.findAllData(modelPatientData.modelPatientData)
                                        .then(result => {
                                                console.log(result); // DEBUG
                                                return res.status(200).send(result);
                                        })
                                        .catch(err => {
                                                console.log(err);
                                                return res.status(500).send(err);
                                        });
        //return res.status(200).send(result);
})

/**
 * @swagger
 * definitions:
 *   modelPatientDataIdReq:
 *     properties:
 *       _id:
 *         type: string
 *         example: 5ddc5f4fb5193a346de246a0
 */

/**
 * @swagger
 * /api/patientData/patientDataId:
 *   get:
 *     summary: Display one patient's data registered in DB find by ID.
 *     description: Returns a JSON List with patients' data registered in DB.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelPatientDataIdReq'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelPatientDataRes'
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             examples:
 *                '0':
 *                  value: error Need to be configured.
 */
router.get('/patientDataId', async function(req, res) {
        try {
        const result = await ctrlRead.findUserByID(modelPatientData.modelPatientData, req.body._id);
        console.log("1")
        if (result) {
                const saveResult = result;
                // console.log(saveResult);
                console.log("2")

                const data = await ctrlDelete.findUserAndDelete(modelPatientData.modelPatientData, req.body._id);
                console.log("3")

                if (!data) {
                        console.log("4")

                        return res.status(500).send({Error: "Delete User (patientDataId) Failed."})
                }
                console.log("5")

        } else {
                return res.status(200).send({msg: "No data."})
        }
        console.log("6")

        return res.status(200).send(result);
        }
        catch(err) {
                return res.status(500).send(err.stack);

        }

})


/* POST Connexion page. */
/**
 * @swagger
 * /api/patientData/patientDataId:
 *   post:
 *     summary: Display one patient's data registered in DB find by ID. [POST FOR MOBILE]
 *     description: Returns a JSON List with patients' data registered in DB.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelPatientDataIdReq'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelPatientDataRes'
 *       500:
 *         description: ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             examples:
 *                '0':
 *                  value: error Need to be configured.
 */
router.post('/patientDataId', async function(req, res) {
        try {
        const result = await ctrlRead.findUserByID(modelPatientData.modelPatientData, req.body._id);
        if (result) {
                const saveResult = result;
                // console.log(saveResult);

                const data = await ctrlDelete.findUserAndDelete(modelPatientData.modelPatientData, req.body._id);

                if (!data) {
                        return res.status(500).send({Error: "Delete User (patientDataId post) Failed."})
                }

        } else {
                return res.status(200).send({msg: "No data."})
        }

        return res.status(200).send(result);
        }
        catch(err) {
                return res.status(500).send(err.stack);

        }

})
 /**
  * @swagger
  * /api/patientData/create:
  *   post:
  *     summary: Create and Add patient's information in DB.
  *     description: After send a JSON, Returns a JSON added.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelPatientData'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelPatientDataRes'
  *       500:
  *         description: ERROR
  *         content:
  *           application/json:
  *             schema:
  *               type: string
  *             examples:
  *                '0':
  *                  value: error Need to be configured
  */

router.post('/create',
        [ctrlEValidatorPatientData.patientDataIsValid()],
        async function(req, res) {
                try {
                        const resultModelPatientData = new modelPatientData.modelPatientData(req.body);
                        const errorModelPatientData = await resultModelPatientData.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errorModelPatientData === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultModelPatientData); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                await resultModelPatientData.save();
                                return res.status(200).send(resultModelPatientData);
                        } else {
                                console.log(errorModelPatientData);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelPatientData, resultEValidatorHandlerError]);
                        }
                        // console.log(resultModelPatientData); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err);
                        // return res.status(500).send()
                }


        // try {
        //     const user = new userConnection(req.body)
        //     await user.save()
        //     const token = await user.generateAuthToken()
        //     console.log(user)
        //     res.status(201).send({ user})
        // } catch (error) {
        //     res.status(500).send(error)
        // }
})

/* DELETE Connexion page. */

 /**
  * @swagger
  * /api/patientData/delete:
  *   delete:
  *     summary: Delete patient's data in DB by ID.
  *     description: After send a ID JSON, Delete the patient's data and Returns a JSON deleted.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelPatientDataIdReq'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelPatientDataRes'
  *       500:
  *         description: ERROR
  *         content:
  *           application/json:
  *             schema:
  *               type: string
  *             examples:
  *                '0':
  *                  value: error Need to be configured
  */

router.delete('/delete', async function(req, res) {
        try {

                const result = await ctrlDelete.findUserAndDelete(modelPatientData.modelPatientData, req.body._id);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})



/* UPDATE Connexion page. */


 /**
  * @swagger
  * definitions:
  *   modelPatientDataReqPUTMethod:
  *     properties:
  *       _id:
  *         type: string
  *         example: 5ddc5f4fb5193a346de246a0
  *       lastName:
  *         type: string
  *         example: Joey
  *       firstName:
  *         type: string
  *         example: Oconor
  */

  /**
   * @swagger
   * definitions:
   *   modelPatientDataResPUTMethod:
   *     properties:
   *       _id:
   *         type: string
   *         example: 5ddc5f4fb5193a346de246a0
   *       lastName:
   *         type: string
   *         example : OldBoy
   *       firstName:
   *         type: string
   *         example: ODeSu
   *       age:
   *         type: integer
   *         example : 20
   *       gender:
   *         type: enum
   *         example : ["Male", "Female"]
   *       height:
   *         type: integer
   *         example : 180
   *       weight:
   *         type: integer
   *         example : 80
   *       emergencyNumber:
   *             type: string
   *             example : [ '+33658893939', 0638495959, 0139384458]
   *       allergies:
   *         type: string
   *         example: codeine
   *       medicalHistory:
   *         type: string
   *         example: myopie
   *       bloodType:
   *         type: enum
   *         example : ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
   *       socialNumber:
   *         type: string
   *         example: 4231785432789243432
   *       treatments:
   *         type: string
   *         example: lunettes
   *       organDonation:
   *         type: boolean
   *         example: ["true", "false"]
   *       doctor:
   *         type: string
   *         example: Dr.Chopin
   */

 /**
  * @swagger
  * /api/patientData/update:
  *   put:
  *     summary: Update patient's data in DB by ID.
  *     description: After send a JSON with new data, update the patient's data and Returns a JSON updated. IN JSON ID IS MANDATORY
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelPatientDataReqPUTMethod'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelPatientDataResPUTMethod'
  *       500:
  *         description: ERROR
  *         content:
  *           application/json:
  *             schema:
  *               type: string
  *             examples:
  *                '0':
  *                  value: error Need to be configured
  */
router.put('/update',
        [ctrlEValidatorPatientData.patientDataIsValidPUT()],
        async function(req, res) {
                try {
                        const resultModelPatientData = new modelPatientData.modelPatientData(req.body);
                        const errorModelPatientData = await resultModelPatientData.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errorModelPatientData === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultModelPatientData); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                const updateResult = await ctrlUpdate.updateValueById(modelPatientData.modelPatientData, req.body._id, req.body);

                                return res.status(200).send(updateResult);
                        } else {
                                console.log(errorModelPatientData);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelPatientData, resultEValidatorHandlerError]);
                        }
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
                        // return res.status(500).send()
                }
})
module.exports = router;
