var express = require('express');
var router = express.Router();

require('util').inspect.defaultOptions.depth = null

router.get('/.well-known/acme-challenge/ByRKfox5xcscjg9fVIhIk1R-vMloimQWttWxHs83_DI', function(req, res, next) {
   return res.status(200).send("ByRKfox5xcscjg9fVIhIk1R-vMloimQWttWxHs83_DI.UL87H8HPEIn3yS0CDCUKmabsrSJDf1d3PSpI4Y9nfxM")).end();
})
