var express = require('express');
var router = express.Router();
//var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var auth = require('../DB/Controllers/authentification').auth;

//var userConnection = require('../DB/models/modelConnection');
//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('util').inspect.defaultOptions.depth = null

router.get('/.well-known/acme-challenge/RsXY48ehzgQEZoRvk6NEBXAaJpLYvjQ3sKV8wAsOBYs', function(req, res, next) {
   console.log("RsXY48ehzgQEZoRvk6NEBXAaJpLYvjQ3sKV8wAsOBYs.9Oj-U5p-jg_9Fo0kLPuNzNmX4RwGL7UzpF0GXIP1UPQ");
   return res.status(200).send("RsXY48ehzgQEZoRvk6NEBXAaJpLYvjQ3sKV8wAsOBYs.9Oj-U5p-jg_9Fo0kLPuNzNmX4RwGL7UzpF0GXIP1UPQ").end();
})
