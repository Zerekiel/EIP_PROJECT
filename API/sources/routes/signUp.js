var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var userConnection = require('../DB/models/modelConnection');

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
 * /api/signup:
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
  * /api/signup:
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
//
//         console.log("TEST : ADD USER IN DB WITH JSON RECEIVE");
//         const user = new userConnection(
//                 {
//                         userName: req.body.userName,
//                         password: req.body.password
//                 }).save(function(err, result){
//                         if (err)
//                         {
//                                 console.log("ERROR POST API/CONNEXiON");
//                                 res.status(500).send(err);
//                         }
//                         else
//                         {
//                                 console.log(result);
//                                 console.log("END TEST : ADD USER IN DB WITH JSON RECEIVE");
//
//                                 res.status(200).end();
//                         }
//
//                 });
//
//         return res.json({ userName: req.body.userName, password: req.body.password });
// });

router.post('/', async function(req, res) {
        try {
            const user = new userConnection(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            console.log(user)
            res.status(201).send({ user})
        } catch (error) {
            res.status(500).send(error)
        }
})

module.exports = router;
