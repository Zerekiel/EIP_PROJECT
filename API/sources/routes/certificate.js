var express = require('express');
var router = express.Router();

require('util').inspect.defaultOptions.depth = null

router.get('/.well-known/acme-challenge/CVijzRwNA8u8f1yKdPFvYVcxkA7LC8j77z-coCbmcnA', function(req, res, next) {
  console.log("CVijzRwNA8u8f1yKdPFvYVcxkA7LC8j77z-coCbmcnA");
   return res.status(200).send("CVijzRwNA8u8f1yKdPFvYVcxkA7LC8j77z-coCbmcnA.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g")).end();
})
