var express = require('express');
var router = express.Router();
var auth = require('../controllers/authentification/ctrlAuthentification').auth;
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

require('util').inspect.defaultOptions.depth = null
/* POST Connexion page. */

/**
 * @swagger
 * definitions:
 *   modelSignin:
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
  *   modelSigninToken:
  *     properties:
  *       userName:
  *         type: string
  *         example : OldBoy
  *       password:
  *         type: string
  *         example: password
  *       token:
  *         type: string
  *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhOTkyM2ZkNzUxZWM0NjBlOGRiOTIiLCJpYXQiOjE1Nzc3NTYxNTZ9.xauRBJ1wJbT99Ue6ZsGdno5vuW1_5fVmzy68tANqe1s
  */
 /**
  * @swagger
  * definitions:
  *   modelSigninResponse:
  *     properties:
  *       exist:
  *         type: boolean
  *         example: true
  */

/**
 * @swagger
 * /api/signin:
 *   get:
 *     summary: Receive a JSON user and seach if the user exist.
 *     description: Return true if the user exist or false if he doesn't exist.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelSignin'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               $ref: '#/definitions/modelSigninResponse'
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

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: log user out of the application.
 *     description: Kill bearers token and send a JSON in body. authorization with Bearer Token is needed.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelSignin'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelSigninToken'
 *             example:
 *               message: User Logout
 *               userName: OldBoy
 *               password: password
 *               token: []
 *       500:
 *         description: ERROR
 */

router.post('/', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({message: "USER LOGOUT", user: req.user})
    } catch (error) {
        res.status(500).send(error)
    }
})




/**
 * @swagger
 * /api/logout/logoutall:
 *   post:
 *     summary: log user out of all devices.
 *     description: Kill all bearers token and send a JSON in body. authorization with Bearer Token is needed.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/definitions/modelSignin'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/modelSigninToken'
 *             example:
 *               message: User Logout the application
 *               userName: OldBoy
 *               password: password
 *               token: []
 *       500:
 *         description: ERROR
 */
router.post('/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send({message: "USER LOGOUT", isConnected: false, user: req.user})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;
