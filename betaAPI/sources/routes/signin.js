const express = require('express');
const router = express.Router();
const modelSignup = require('../models/modelSignup');
const modelSignin = require('../models/modelSignin');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorSignin = require('../controllers/validators/signinValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');
const ctrlTools = require('../controllers/tools/ctrlTools');

/**
* @swagger
* definitions:
*   modelSigninRequest:
*     properties:
*       email:
*         type: string
*         example : test@test.com
*       password:
*         type: string
*         example: password
*/

/**
* @swagger
* definitions:
*   modelSigninResponse:
*     properties:
*       email:
*         type: string
*         example: test@test.com
*       password:
*         type: string
*         example: password
*       token:
*         type: string
*         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
*/


router.get('/', function(req, res) {
        return new Promise((resolve, reject) => {
                ctrlRead.findAllData(modelSignin.modelSignin)
                         .then(result => {
                                 console.log(result); // DEBUG
                                 if (result == '[]') {
                                         const msg = { msg: "There are no data.", result: result };
                                         return resolve(res.status(202).send(msg));

                                 } else {
                                         return resolve(res.status(200).send(result));
                                 }
                        })
                        .catch(err => {
                                console.log(err);
                                return reject(res.status(500).send(err.stack));
                        });
                })
});

/**
 * @swagger
 * /api/signin/signinId:
 *   post:
 *     summary: /api/signin/signinIdBy IDList one user by ID . [POST FOR MOBILE]
 *     description: By ID, List one user connected.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
router.get('/signinId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelSignin.modelSignin, req.body._id)
        return res.status(200).send(result);

})
/**
 * @swagger
 * /api/signin/me:
 *   get:
 *     summary: Receive a JSON user and seach if the user exist.
 *     description: Return JSON exist or not.
 *     requestBody:
 *       description: Need Token Bearer for the authorization.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelSigninRequest'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               $ref: '#/definitions/modelSigninResponse'
 *             example:
 *               email: OldBoy
 *               password: password
 *               token:
 *                 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
 *                 - []
 *       500:
 *         description: ERROR
 */
// router.get('/me', auth, async(req, res) => {
//
//     // View logged in user profile
//     res.status(200).send({user: req.user, isConnected: "true"})
// })

/* POST Connexion page. */


  /**
   * @swagger
   * /api/signin:
   *   post:
   *     summary: Add user into signin collection.
   *     description: After send a JSON in body, Returns a JSON added.
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/definitions/modelSigninRequest'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/definitions/modelSigninResponse'
   *             example:
   *               email: OldBoy
   *               password: password
   *               token:
   *                 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
   *       500:
   *         description: ERROR
   *       501:
   *         description: ERROR Login Failed
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/definitions/modelSigninResponse'
   *             example:
   *               error: Login failed! Check authentication credentials
   */
router.post('/', [ctrlEValidatorSignin.signinIsValid()], async(req, res) => {
        //Login a registered user
        try {
              const {email, password} = req.body
              const resultModelSignup = new modelSignup.modelSignup(req.body);
              const resultModelSignin = new modelSignin.modelSignin(req.body);

              const errormodelSignin = await resultModelSignin.validateSync();

              const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

              if (errormodelSignin === undefined &&
                      JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                             const resultModelSignin2 = await modelSignin.modelSignin.findByCredentials(email, password)
                              if (!resultModelSignin2) {
                                  return res.status(501).send({error: 'Login failed! Check authentication credentials'})
                              }
                              const token = await resultModelSignin.generateAuthToken()
                              return res.status(200).send({ resultModelSignin, token });

              } else {
                      console.log(errormodelSignin);
                      console.log(resultEValidatorHandlerError);
                      return res.status(500).send([errormodelSignin, resultEValidatorHandlerError]);
              }




        } catch (error) {
          res.status(500).send(error.stack)
        }
})









  /**
   * @swagger
   * /api/signin/create:
   *   post:
   *     summary: Add user into signin collection.
   *     description: After send a JSON in body, Returns a JSON added.
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/definitions/modelSigninRequest'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/definitions/modelSigninResponse'
   *             example:
   *               email: OldBoy
   *               password: password
   *               token:
   *                 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
   *       500:
   *         description: ERROR
   */
router.post('/create', [ctrlEValidatorSignin.signinIsValid()], async (req, res) => {
       // Create a new user
       try {

               const resultModelSignin = new modelSignin.modelSignin(req.body);
               const resultModelSignup = new modelSignup.modelSignup(req.body);
               const errormodelSignin = await resultModelSignin.validateSync();
               const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

               if (errormodelSignin === undefined &&
                       JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                               // await ctrlTools.sameAccount(modelSignup.modelSignup, req.body);
                               // console.log("DEBUG signin : " +resultModelSignin); //DEBUG
                               await resultModelSignin.save(resultModelSignup)
                               const token = await resultModelSignin.generateAuthToken()


                               return res.status(200).send({ resultModelSignin, token });
               } else {
                       console.log(errormodelSignin);
                       console.log(resultEValidatorHandlerError);
                       return res.status(500).send([errormodelSignin, resultEValidatorHandlerError]);
               }








   } catch (error) {
           console.log(error.stack)
           res.status(500).send(error.stack)
       }
})



/* DELETE Connexion page. */
/**
 * @swagger
 * definitions:
 *   modelSigninIdRequest:
 *     properties:
 *       _id:
 *          type: string
 *          example: 5ddc5f4fb5193a346de246a0
 *       email:
 *         type: string
 *         example : OldBoy
 *       password:
 *         type: string
 *         example: password
 */
 /**
  * @swagger
  * /api/signin/delete:
  *   delete:
  *     summary: Delete by ID user in signin DB.
  *     description: After send a ID JSON, Delete signin's datas and Returns a JSON deleted.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelSigninIdRequest'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelSigninIdRequest'
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

                const result = await ctrlDelete.findUserAndDelete(modelSignin.modelSignin, req.body._id);

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
  *   modelSigninReqPUTMethod:
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
   *   modelSigninResPUTMethod:
   *     properties:
   *       _id:
   *         type: string
   *         example: 5ddc5f4fb5193a346de246a0
   *       email:
   *         type: string
   *         example: test@gmail.com
   *       password:
   *         type: string
   *         example : oldboy
   */

 /**
  * @swagger
  * /api/signin/update:
  *   put:
  *     summary: Update by ID  signin's datas data in signin DB.
  *     description: After send a JSON with new data, update the signin's data and Returns a JSON updated. IN JSON ID IS MANDATORY
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelSigninReqPUTMethod'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelSigninResPUTMethod'
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
                try {
                        const resultModelSignin = new modelSignin.modelSignin(req.body);
                        const errorModelSignin = await resultModelSignin.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);
                        if (errorModelSignin === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        // console.log(resultModelSignin); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                const updateResult = await ctrlUpdate.updateValueById(modelSignin.modelSignin, req.body._id, req.body);

                                return res.status(200).send(updateResult);
                        } else {
                                console.log(errorModelSignin);
                                console.log("FFF");

                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelSignin, resultEValidatorHandlerError]);
                        }
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
                        // return res.status(500).send()
                }














                //
                // const result = await ctrlUpdate.updateValueById(modelSignin.modelSignin, req.body._id, req.body);
                //
                // return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})
module.exports = router;
