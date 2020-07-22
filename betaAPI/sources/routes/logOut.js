var express = require('express');
var router = express.Router();
var auth = require('../controllers/authentification/ctrlAuthentification').auth;
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

require('util').inspect.defaultOptions.depth = null

/* POST */

// router.post('/', function(req, res) {
//         var o_auth;
//         o_auth = new auth();
//         var userModel = {
//                 userName: req.body.userName,
//                 password: req.body.password
//         }
//
//         o_auth.testAuth('HealthSafe', 'UserConnexion', userModel);
//         console.log("T12");
//         res.end();
// });



///////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST

router.post('/', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send({message: "USER LOGOUT", user: req.user})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send({message: "USER LOGOUT", isConnected: false, user: req.user})
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;
