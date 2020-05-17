var express = require('express');
var router = express.Router();

require('util').inspect.defaultOptions.depth = null

router.get('/.well-known/acme-challenge/uojH4179y7Tlalc2WIf2A8ywUy6IUXUDMnHBisFxsrU', function(req, res, next) {
  console.log("uojH4179y7Tlalc2WIf2A8ywUy6IUXUDMnHBisFxsrU.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g");
   return res.status(200).send("uojH4179y7Tlalc2WIf2A8ywUy6IUXUDMnHBisFxsrU.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g")).end();
})
