const express = require('express');
const router = express.Router();
const modelDrProfile = require('../models/modelDrProfile');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorDrProfile = require('../controllers/validators/drProfileValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/**
 * @swagger
 * definitions:
 *   modelDrProfile:
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
 *       phoneNumber:
 *             type: string
 *             example : [ '+33658893939', 0638495959, 0139384458]
 *       address:
 *         type: object
 *         properties:
 *           streetNumber:
 *             type: integer
 *             example : 3
 *           typeStreetNumber:
 *             type: enum
 *             example : ['', bis, ter]
 *           typeStreet:
 *             type: enum
 *             example : [rue, avenue, boulevard, chemin]
 *           street:
 *             type: string
 *             example : des paradis
 *           zipCode:
 *             type: integer
 *             example : 95170
 *           city:
 *             type: string
 *             example : Paris
 *           country:
 *             type: string	displayAlldrProfile,

 *             example : France
 *       email:
 *         type: string
 *         example: test@gmail.com
 *       password:
 *         type: string
 *         example : oldboy
 *       confirmationPassword:
 *         type: string
 *         example: oldboy
 *       expertiseDomain:
 *         type: string
 *         required : true
 *         example : Generaliste
 *       idNumber:
 *         type: string
 *         example: 245432534254325234
 */

 /**
  * @swagger
  * definitions:
  *   modelDrProfileRes:
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
  *       phoneNumber:
  *         type: string
  *         example : [ '+33658893939', 0638495959, 0139384458]
  *       address:
  *         type: object
  *         properties:
  *           streetNumber:
  *             type: integer
  *             example : 3
  *           typeStreetNumber:
  *             type: enum
  *             example : ['', bis, ter]
  *           typeStreet:
  *             type: enum
  *             example : [rue, avenue, boulevard, chemin]
  *           street:
  *             type: string
  *             example : des paradis
  *           zipCode:
  *             type: integer
  *             example : 95170
  *           city:
  *             type: string
  *             example : Paris
  *           country:
  *             type: string
  *             example : France
  *       email:
  *         type: string
  *         example: test@gmail.com
  *       password:
  *         type: string
  *         example : oldboy
  *       confirmationPassword:
  *         type: string
  *         example: oldboy
  *       expertiseDomain:
  *         type: string
  *         required : true
  *         example : Generaliste
  *       idNumber:
  *         type: string
  *         example: 245432534254325234
  */


/* GET Connexion page. */

/**
 * @swagger
 * /api/drProfile:
 *   get:
 *     summary: Display all Dr profile registered.
 *     description: Returns a List of all Dr profile registered in DB.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelDrProfileRes'
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
        //
        const result = await ctrlRead.findAllData(modelDrProfile.modelDrProfile)
                                        .then(result => {
                                                console.log(result); // DEBUG
                                                return res.status(200).send(result);
                                        })
                                        .catch(err => {
                                                console.log(err);
                                                return res.status(500).send(err);
                                        });
})

/**
 * @swagger
 * definitions:
 *   modelDrProfileIdReq:
 *     properties:
 *       _id:
 *         type: string
 *         example: 5ddc5f4fb5193a346de246a0
 */

/**
 * @swagger
 * /api/drProfile/drProfileId:
 *   get:
 *     summary: List one Dr profile of registered by ID.
 *     description: Returns a Dr profile registered in DB by ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelDrProfileIdReq'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelDrProfileRes'
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
router.get('/drProfileId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelDrProfile.modelDrProfile, req.body._id)
        return res.status(200).send(result);

})


/* POST Connexion page. */
/**
 * @swagger
 * /api/drProfile/drProfileId:
 *   post:
 *     summary: List one Dr profile of registered by ID. [POST FOR MOBILE]
 *     description: Returns a Dr profile registered in DB by ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelDrProfileIdReq'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelDrProfileRes'
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
router.post('/drProfileId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelDrProfile.modelDrProfile, req.body._id)
        return res.status(200).send(result);

})
 /**
  * @swagger
  * /api/drProfile/create:
  *   post:
  *     summary: Add Dr profile in DB.
  *     description: After send a JSON, Returns a JSON added.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelDrProfile'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelDrProfileRes'
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
        [ctrlEValidatorDrProfile.drProfileIsValid()],
        async function(req, res) {
                try {
                        const resultmodelDrProfile = new modelDrProfile.modelDrProfile(req.body);
                        const errormodelDrProfile = await resultmodelDrProfile.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errormodelDrProfile === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultmodelDrProfile); //DEBUG
                                await resultmodelDrProfile.save();
                                return res.status(200).send(resultmodelDrProfile);
                        } else {
                                console.log(errormodelDrProfile);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errormodelDrProfile, resultEValidatorHandlerError]);
                        }
                        // console.log(resultmodelDrProfile); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).end();
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
  * /api/drProfile/delete:
  *   delete:
  *     summary: Delete by ID Dr profile in DB.
  *     description: After send a ID JSON, Delete the Dr profile and Returns a JSON deleted.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelDrProfileIdReq'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelDrProfileRes'
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

                const result = await ctrlDelete.findUserAndDelete(modelDrProfile.modelDrProfile, req.body._id);

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
  *   modelDrProfileReqPUTMethod:
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
   *   modelDrProfileResPUTMethod:
   *     properties:
   *       _id:
   *         type: string
   *         example: 5ddc5f4fb5193a346de246a0
   *       lastName:
   *         type: string
   *         example : Joey
   *       firstName:
   *         type: string
   *         example: Oconor
   *       age:
   *         type: integer
   *         example : 20
   *       phoneNumber:
   *         type: string
   *         example : [ '+33658893939', 0638495959, 0139384458]
   *       address:
   *         type: object
   *         properties:
   *           streetNumber:
   *             type: integer
   *             example : 3
   *           typeStreetNumber:
   *             type: enum
   *             example : ['', bis, ter]
   *           typeStreet:
   *             type: enum
   *             example : [rue, avenue, boulevard, chemin]
   *           street:
   *             type: string
   *             example : des paradis
   *           zipCode:
   *             type: integer
   *             example : 95170
   *           city:
   *             type: string
   *             example : Paris
   *           country:
   *             type: string
   *             example : France
   *       email:
   *         type: string
   *         example: test@gmail.com
   *       password:
   *         type: string
   *         example : oldboy
   *       confirmationPassword:
   *         type: string
   *         example: oldboy
   *       expertiseDomain:
   *         type: string
   *         required : true
   *         example : Generaliste
   *       idNumber:
   *         type: string
   *         example: 245432534254325234
   */

 /**
  * @swagger
  * /api/drProfile/update:
  *   put:
  *     summary: Update by ID  Dr profile's data in DB.
  *     description: After send a JSON with new data, update the Dr profile's data and Returns a JSON updated. IN JSON ID IS MANDATORY
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelDrProfileReqPUTMethod'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelDrProfileResPUTMethod'
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
        [ctrlEValidatorDrProfile.drProfileIsValidPUT()],
        async function(req, res) {
        try {
                try {
                        const resultModelDrProfile = new modelDrProfile.modelDrProfile(req.body);
                        const errorModelDrProfile = await resultModelDrProfile.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errorModelDrProfile === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultModelDrProfile); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                const updateResult = await ctrlUpdate.updateValueById(modelDrProfile.modelDrProfile, req.body._id, req.body);

                                return res.status(200).send(updateResult);
                        } else {
                                console.log(errorModelDrProfile);
                                console.log("FFF");

                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelDrProfile, resultEValidatorHandlerError]);
                        }
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
                        // return res.status(500).send()
                }














                //
                // const result = await ctrlUpdate.updateValueById(modelDrProfile.modelDrProfile, req.body._id, req.body);
                //
                // return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})
module.exports = router;
