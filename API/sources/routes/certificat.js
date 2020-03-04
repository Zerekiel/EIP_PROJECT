var express = require('express');
var router = express.Router();
//var auth = require('../DB/Controllers/authentification').auth;

require('util').inspect.defaultOptions.depth = null

router.get('/.well-known/acme-challenge/zACAJGF-vZC-pWVj3IaM0wRHSZ3UYjmfRm5WYfa_U2Q', function(req, res, next) {
//   console.log("zACAJGF-vZC-pWVj3IaM0wRHSZ3UYjmfRm5WYfa_U2Q.9Oj-U5p-jg_9Fo0kLPuNzNmX4RwGL7UzpF0GXIP1UPQ");
   return res.status(200).send("zACAJGF-vZC-pWVj3IaM0wRHSZ3UYjmfRm5WYfa_U2Q.9Oj-U5p-jg_9Fo0kLPuNzNmX4RwGL7UzpF0GXIP1UPQ").end();
})
//res.sendfile()
