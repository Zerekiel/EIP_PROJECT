var express = require('express');
var router = express.Router();
var path = require("path");

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Display API Documentation.
 *     description: Render API Documentation.
 *     responses:
 *       200:
 *         description: OK'
 *       500:
 *         description: ERROR
 */
router.get('/', (req, res, next) => {

        try
        {
                res.status(200);
                return res.render('redoc');
        }
        catch(err)
        {
                console.log(err.stack);
                return res.status(500).send(err.stack);
        }

});

module.exports = router;
