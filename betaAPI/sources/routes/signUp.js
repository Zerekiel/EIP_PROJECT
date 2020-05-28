const express = require('express');
const router = express.Router();
const modelSignup = require('../models/modelSignup');
const modelDrProfile = require('../models/modelDrProfile');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorSignup = require('../controllers/validators/signupValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/**
 * @swagger
 * definitions:
 *   modelSignup:
 *     properties:
 *       lastName:
 *         type: string
 *         example : OldBoy
 *       firstName:
 *         type: string
 *         example: ODeSu
 *       age:
 *         type: integer	displayAllSignup,

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
 *             type: string	displayAllSignup,

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
  *   modelSignupRes:
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
 * /api/signup:
 *   get:
 *     summary: Display all Users of registered.
 *     description: Returns a List of all users registered in DB.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelSignupRes'
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
        const result = await ctrlRead.displayAllSignup(modelSignup.modelSignup);
        return res.status(200).send(result);
})

/**
 * @swagger
 * definitions:
 *   modelSignupIdReq:
 *     properties:
 *       _id:
 *         type: string
 *         example: 5ddc5f4fb5193a346de246a0
 */

/**
 * @swagger
 * /api/signup/signupId:
 *   get:
 *     summary: List all Users of registered.
 *     description: Returns a List of all users registered in DB.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelSignupIdReq'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelSignupRes'
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
router.get('/signupId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelSignup.modelSignup, req.body._id)
        return res.status(200).send(result);

})


/* POST Connexion page. */

 /**
  * @swagger
  * /api/signup/create:
  *   post:
  *     summary: Add user in DB for registration.
  *     description: After send a JSON, Returns a JSON added.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelSignup'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelSignupRes'
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
        [ctrlEValidatorSignup.signupIsValid()],
        async function(req, res) {
                try {
                        const resultModelSignup = new modelSignup.modelSignup(req.body);
                        const errorModelSignup = await resultModelSignup.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        // console.log("END DEBUG")
                        if (errorModelSignup === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log("TEST : " + resultModelSignup); //DEBUG
                                        await resultModelSignup.save();

                                        const resultModelDrProfile = new modelDrProfile.modelDrProfile(req.body);
                                        await resultModelDrProfile.save();
                                        // const token = await user.generateAuthToken()




                                        return res.status(200).send(resultModelSignup);
                        } else {
                                console.log(errorModelSignup);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelSignup, resultEValidatorHandlerError]);
                        }
                        // console.log(resultModelSignup); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
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
  * /api/signup/delete:
  *   delete:
  *     summary: Delete user in DB for registration by ID.
  *     description: After send a ID JSON, Delete the user and Returns a JSON deleted.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelSignupIdReq'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelSignupRes'
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

                const result = await ctrlDelete.findUserAndDelete(modelSignup.modelSignup, req.body._id);

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
  *   modelSignupReqPUTMethod:
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
   *   modelSignupResPUTMethod:
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
  * /api/signup/update:
  *   put:
  *     summary: Update user's data in DB for registration by ID.
  *     description: After send a JSON with new data, update the user's data and Returns a JSON updated. IN JSON ID IS MANDATORY
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelSignupReqPUTMethod'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelSignupResPUTMethod'
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
router.put('/update', async function(req, res) {
        try {
                const result = await ctrlUpdate.updateValueById(modelSignup.modelSignup, req.body._id, req.body);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err.stack);
                // return res.status(500).send()
        }
})
module.exports = router;
