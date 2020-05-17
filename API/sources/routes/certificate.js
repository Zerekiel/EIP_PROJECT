var express = require('express');
var router = express.Router();

require('util').inspect.defaultOptions.depth = null

router.get('./.well-known/acme-challenge/ByRKfox5xcscjg9fVIhIk1R-vMloimQWttWxHs83_DI', function(req, res, next) {
  // console.log("uojH4179y7Tlalc2WIf2A8ywUy6IUXUDMnHBisFxsrU.47RuyWoD03tWxpHQL51Ae5b_IOgKid8v9bSEEyEQU-g");
   return res.status(200).send("ByRKfox5xcscjg9fVIhIk1R-vMloimQWttWxHs83_DI.UL87H8HPEIn3yS0CDCUKmabsrSJDf1d3PSpI4Y9nfxM")).end();
})
