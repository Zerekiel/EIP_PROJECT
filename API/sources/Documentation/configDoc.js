var express = require('express');
var router = express.Router();
var path = require("path");
var swaggerJSDoc = require('swagger-jsdoc');

// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  info: {
    title: 'HealthSafe API',
    version: '1.0.0',
    description: 'All routes of API',
  },
  host: 'localhost:3000',
  host2: 'https://healthsafe-api.herokuapp.com',
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
