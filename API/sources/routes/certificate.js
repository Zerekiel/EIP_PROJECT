var express = require('express');
var router = express.Router();

require('util').inspect.defaultOptions.depth = null

router.get('/.well-known/acme-challenge/gMN31BrbXczasKzZgc5xAQJMy-pyCjJSZS6-GDH_DL0', function(req, res, next) {
  console.log("gMN31BrbXczasKzZgc5xAQJMy-pyCjJSZS6-GDH_DL0.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g");
   return res.status(200).send("gMN31BrbXczasKzZgc5xAQJMy-pyCjJSZS6-GDH_DL0.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g")).end();
})
