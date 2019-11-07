var express = require('express');
var router = express.Router();
var path = require("path");
var swaggerJSDoc = require('swagger-jsdoc');

// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  info: {
    title: 'Animals',
    version: '1.0.0',
    description: 'All things animlas',
  },
  host: 'localhost:3000',
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

// -- routes for docs and generated swagger spec --
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;
