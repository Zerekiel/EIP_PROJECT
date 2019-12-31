var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var userConnection = require('../DB/models/modelConnection');
 var auth = require('../DB/Controllers/authentification').auth;
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

require('util').inspect.defaultOptions.depth = null

/* POST Connexion page. */

/**
 * @swagger
 * definitions:
 *   modelUserConnexion:
 *     properties:
 *       userName:
 *         type: string
 *         example : OldBoy
 *       password:
 *         type: string
 *         example: password
 */
 /**
  * @swagger
  * definitions:
  *   signInResponse:
  *     properties:
  *       exist:
  *         type: boolean
  *         example: true
  */

/**
 * -@swagger
 * /api/signin:
 *   get:
 *     summary: Receive a JSON user and seach if the user exist.
 *     description: Return true if the user exist or false if he doesn't exist.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelUserConnection'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               $ref: '#/definitions/signInResponse'
 *             example:
 *               - true
 *               - false
 *       500:
 *         description: ERROR
 */
// router.get('/', function(req, res, next) {
//         var o_dbCRUD;
//         o_dbCRUD = new dbCRUD();
//
//         var userModel = {
//                 userName: req.body.userName,
//                 password: req.body.password
//         }
//
//         console.log("TEST");
//         o_dbCRUD.findUser("HealthSafe", "UserConnexion", userModel, function(result, err) {
//                 var exist;
//                 exist = false;
//
//                 if (err)
//                 {
//                         console.log("ERROR FIND USER")
//                         console.log(err);
//
//                         return res.status(500).send(err);
//                 }
//                 else if(result == "[]")
//                 {
//                         console.log("TEST : FIND USER IN COLLECTION");
//
//                         // displaying in console json
//                         console.log("User doesn't exist : ", result);
//
//                         console.log("END TEST : FIND USER IN COLLECTION");
//                         return res.status(200).send(exist);
//
//                         // return res.status(200).send({exist, result, message: "User doesn't exist"});
//                 }
//                 else
//                 {
//                         console.log("TEST : FIND USER IN COLLECTION");
//
//                         // displaying in console json
//                         console.log(result);
//
//                         console.log("END TEST : FIND USER IN COLLECTION");
//                         return res.status(200).send(!exist);
//                 }
//         })
//
// })

/* POST Connexion page. */

 /**
  * @swagger
  * /api/connexion:
  *   post:
  *     summary: Add user into UserConnexion collection.
  *     description: After send a JSON in body, Returns a JSON added.
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             $ref: '#/definitions/modelUserConnection'
  *     responses:
  *       200:
  *         description: OK
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               $ref: '#/definitions/modelUserConnectionResponse'
  *       500:
  *         description: ERROR
  */


// router.post('/', function(req, res) {
//         var o_auth;
//         o_auth = new auth();
//         var userModel = {
//                 userName: req.body.userName,
//                 password: req.body.password
//         }
//
//         o_auth.testAuth('HealthSafe', 'UserConnexion', userModel);
//         console.log("T12");
//         res.end();
// });



///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/', async (req, res) => {
    // Create a new user
    try {
        const user = new userConnection(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/t', async(req, res) => {
    //Login a registered user
    try {
        const { userName, password } = req.body
        const user = await userConnection.findByCredentials(userName, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router;
