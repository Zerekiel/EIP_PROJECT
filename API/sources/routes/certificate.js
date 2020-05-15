var express = require('express');
var router = express.Router();
//var auth = require('../DB/Controllers/authentification').auth;

require('util').inspect.defaultOptions.depth = null

router.get('.well-known/acme-challenge/rGhOaNjGW_jaIWrQ4q6uqnsfShohoPdsp52RRqx7oEI', function(req, res, next) {
//   console.log("zACAJGF-vZC-pWVj3IaM0wRHSZ3UYjmfRm5WYfa_U2Q.9Oj-U5p-jg_9Fo0kLPuNzNmX4RwGL7UzpF0GXIP1UPQ");
   return res.status(200).send("rGhOaNjGW_jaIWrQ4q6uqnsfShohoPdsp52RRqx7oEI.UL87H8HPEIn3yS0CDCUKmabsrSJDf1d3PSpI4Y9nfxM")).end();
})
//res.sendfile()
