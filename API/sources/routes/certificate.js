var express = require('express');
var router = express.Router();

require('util').inspect.defaultOptions.depth = null

router.get('/.well-known/acme-challenge/SzofPKBSZKUa8etqsbUI32JwP6lorpFBTUFH8JZW1_E', function(req, res, next) {
  console.log("SzofPKBSZKUa8etqsbUI32JwP6lorpFBTUFH8JZW1_E.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g
");
   return res.status(200).send("SzofPKBSZKUa8etqsbUI32JwP6lorpFBTUFH8JZW1_E.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g
")).end();
})
