var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var auth = require('../DB/Controllers/authentification').auth;

var userConnection = require('../DB/models/modelConnection');
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')


require('util').inspect.defaultOptions.depth = null

/* GET Connexion page. */

/**
 * @swagger
 * definitions:
 *   modelUserConnection:
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
  *   modelUserConnectionResponse:
  *     properties:
  *       _id:
  *         type: string
  *         example: 5ddc5f4fb5193a346de246a0
  *       userName:
  *         type: string
  *         example : OldBoy
  *       password:
  *         type: string
  *         example: password
  */

/**
 * @swagger
 * /api/connexion:
 *   get:
 *     summary: List all JSON user.
 *     description: Returns a List of all username/password connexion in UserConnexion collection.
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
router.get('/', function(req, res, next) {
        var o_dbCRUD;
        o_dbCRUD = new dbCRUD();

        o_dbCRUD.readCollection("HealthSafe", "UserConnexion", function(result, err) {

                if (err)
                {
                        console.log("ERROR GET API/CONNEXION")
                        console.log(err);

                        return res.status(500).send(err);
                }
                else
                {
                        console.log("TEST : READ COLLECTION");

                        // displaying in console json
                        console.log(result);

                        console.log("END TEST : READ COLLECTION");
                        return res.status(200).send(result).end();
                }
        });

})

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


  // connectionSchema.pre('save', async function (next) {
  //     // Hash the password before saving the user model
  //     const user = this
  //     if (user.isModified('password')) {
  //         user.password = await bcrypt.hash(user.password, 8)
  //     }
  //     next()
  // })
router.post('/', async function(req, res) {

        console.log("TEST : ADD USER IN DB WITH JSON RECEIVE");
        // user.tokens = user.tokens.concat({token})

        const user = new userConnection(
                {
                        userName: req.body.userName,
                        password: req.body.password,
                        tokens: []
                })
                var token = jwt.sign({_id: user._id}, process.env.JWT_KEY)

                user.password = await bcrypt.hash(user.password, 8);
                user.tokens = user.tokens.concat({token})
                var t = await user.save()
                console.log("t ", t)



                // user.save(function(err, result){
                //         if (err)
                //         {
                //                 console.log("ERROR POST API/CONNEXiON");
                //                 res.status(500).send(err);
                //         }
                //         else
                //         {
                //                 console.log(result);
                //                 console.log("END TEST : ADD USER IN DB WITH JSON RECEIVE");
                //
                //                 res.status(200).end();
                //         }
                // });
                try{
                        var o_dbCRUD;
                        o_dbCRUD = new dbCRUD();

                        User = o_dbCRUD.findByCredentials('HealthSafe', 'UserConnexion', user.userName, req.body.password);
                        console.log(User)
                        if (!User)
                            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
                        else
                                console.log("OK")
                        // return res.status(200).end();
                } catch (error) {
                        console.log("error")
                        res.status(400).send(error)
                }

                 token = req.header('Authorization').replace('Bearer ', '')
                 console.log("REQ ", req.header('Authorization').replace('Bearer ', ''))
                console.log("TEST TOKEN ",token)
                // console.log(data)
                    const data = jwt.verify(token, process.env.JWT_KEY)
                    try {
                            console.log("TT")
                            console.log(user)
                            console.log(data._id)
                        const User2 = await user.findOne({ _id: data._id, 'tokens.token': token })
                        if (!User2) {
                            throw new Error()
                        }
                        req.User2 = User2
                        req.token = token
                        next()
                    } catch (error) {
                        res.status(401).send({ error: 'Not authorized to access this resource' })
                    }
        //return res.json({ userName: req.body.userName, password: req.body.password });
});

module.exports = router;
