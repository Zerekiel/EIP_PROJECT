var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {

        try
        {
                res.status(200);
                return res.render('redoc');
        }
        catch(err)
        {
                console.log(err.stack);
                return res.status(500).send(err.stack);
        }

});

module.exports = router;
