var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Express' });
});

/* Routes to redirect */

/* redirect options */
router.post('/options', (req, res) => {
    res.redirect('/options');
    res.end();
});

/* redirect deco */
router.post('/deco', (req, res) => {
    res.redirect('/');
    res.end();
});

/* redirect medic profile */
router.post('/profile', (req, res) => {
    res.redirect('/medic');
    res.end();
});

module.exports = router;