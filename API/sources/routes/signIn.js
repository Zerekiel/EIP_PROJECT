var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var userConnection = require('../DB/models/modelConnection');
var auth = require('../DB/Controllers/authentification').auth
sha3_512 = require('js-sha3').sha3_512;
sha3_384 = require('js-sha3').sha3_384;

require('util').inspect.defaultOptions.depth = null

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
  *       userName:
  *         type: string
  *         example: OldBoy
  *       password:
  *         type: string
  *         example: password
  *       token:
  *         type: string
  *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
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
 *               username: OldBoy
 *               password: password
 *               token:
 *                  - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
 *                  - []
 *               existOrNot:
 *                 - true
 *                 - false
 *       201:
 *         description: User Not Found !
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               $ref: '#/definitions/signInResponse'
 *             example:
 *               error: User not found
 *               existOrNot:
 *                 - true
 *                 - false
 *       500:
 *         description: ERROR
 */
router.get('/', function(req, res, next) {
        var o_dbCRUD;
        o_dbCRUD = new dbCRUD();

        // var userModel = {
        //         userName: req.body.userName,
        //         password: req.body.password
        // }
        o_dbCRUD.findUser("HealthSafe", "UserConnexion", {userName: req.body.userName}, function(result, err) {
                var isConnected;
                isConnected = false;

                if (err)
                {
                        console.log("ERROR FIND USER")
                        console.log(err);

                        return res.status(500).send(err);
                }
                else if(result == "[]")
                {
                        console.log("TEST : FIND USER IN COLLECTION");

                        // displaying in console json
                        console.log("User doesn't exist : ", result);

                        console.log("END TEST : FIND USER IN COLLECTION");
                        return res.status(201).send({error : 'User not found!', isConnected: isConnected});

                        // return res.status(200).send({exist, result, message: "User doesn't exist"});
                }
                else
                {
                        console.log("TEST : FIND USER IN COLLECTION");

                        // displaying in console json
                        console.log(JSON.parse(result));
                        user = JSON.parse(result)
                        console.log("END TEST : FIND USER IN COLLECTION");
                        return res.status(200).send({user, isConnected: !isConnected});
                }
        })


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
 *               username: OldBoy
 *               password: password
 *               token:
 *                 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
 *                 - []
 *               existOrNot:
 *                 - true
 *                 - false
 *       500:
 *         description: ERROR
 */
router.get('/me', auth, async(req, res) => {

    // View logged in user profile
    res.status(200).send({user: req.user, isConnected: "true"})
})

/* POST Connexion page. */


  /**
   * @swagger
   * /api/signin:
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
   *             example:
   *               username: OldBoy
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
   *               $ref: '#/definitions/modelUserConnectionResponse'
   *             example:
   *               error: Login failed! Check authentication credentials
   */
  router.post('/', async(req, res) => {
      //Login a registered user
      try {
          userName = sha3_512(sha3_384(userName))
          password = sha3_512(sha3_384(password))
          const { userName, password } = req.body
          const user = await userConnection.findByCredentials(userName, password)
          if (!user) {
              return res.status(501).send({error: 'Login failed! Check authentication credentials'})
          }
          const token = await user.generateAuthToken()
          res.send({ user, token })
      } catch (error) {
          res.status(500).send(error)
      }

  })


  /**
   * @swagger
   * /api/signin/create:
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
   *             example:
   *               username: OldBoy
   *               password: password
   *               token:
   *                 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBhNjM3NGE3OWZhNzhlYjIxZTM5ZmYiLCJpYXQiOjE1Nzc3MzkxNjJ9.-Z8G27Y7srLb1YOBx0a8_vj588OwGZ3U1cSovJp-mF0
   *       500:
   *         description: ERROR
   */
   router.post('/create', async (req, res) => {
       // Create a new user
       try {
           console.log(req.body)
           const user = new userConnection(req.body)
           await user.save()
           const token = await user.generateAuthToken()
           res.status(200).send({ user, token })
   } catch (error) {
           res.status(500).send(error)
       }
   })

module.exports = router;
