var express = require('express');
var router = express.Router();
var path = require("path");



/**
 * @swagger
 * /TEST:
 *   get:
 *     summary: List all the animals
 *     description: Returns a list of all the animals, optionally sorted
 *     tags:
 *       - animals
 *     parameters:
 *       - in: query
 *         name: sort
 *         type: string
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: List of animals
 *         schema:
 *           type: object
 *           properties:
 *             animals:
 *               type: array
 *               description: all the animals
 *               items:
 *                 type: string
 */
router.get('/', (req, res) => {
  // res.sendFile('views', path.resolve(__dirname, 'redoc.html'));
  res.render('redoc');
});

module.exports = router;
