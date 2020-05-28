var express = require('express');
var router = express.Router();


/**
 * @swagger
 * /api:
 *   get:
 *     summary: Display API Documentation.
 *     description: Render API Documentation.
 *     responses:
 *       200:
 *         description: Display API documentation with path /api
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
