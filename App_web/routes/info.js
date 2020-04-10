var express = require('express');
var router = express.Router();
var request = require("request")
var save_body = null;

/* GET info page */
router.get('/', function(req, res, next) {

    request.get('https://healthsafe-api.herokuapp.com/api/stock', function(req, res_api, next) {
        save_body = res_api.body;
        //console.log(save_body);

        res.render('info', {
            title: 'Express',
            doc_name: 'Nom_du_Docteur',
            user_name: 'Paul' /*res.body.first_name + ' '+ stock.last*/ ,
            user_dateOfBirth: '04/03/1997',
            user_profession: 'student',
            user_address: 'Paris',
            user_height: '1.78',
            user_weight: '85' + 'Kg',
            user_blood_type: "O neg.",
            user_allergies: "pollens",
            user_surgeries: "Shoulder",
            user_broken_members: "None"
        });
    });

    //console.log(save_body);
});

/*function getUserData()
{
    request.get
}*/

module.exports = router;