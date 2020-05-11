var express = require('express');
var router = express.Router();
var request = require('request')

var infos = {
    title: undefined,
    doc_name: undefined,
    user_name: undefined,
    user_dateOfBirth: undefined,
    user_profession: undefined,
    user_address: undefined,
    user_height: undefined,
    user_weight: undefined,
    user_blood_type: undefined,
    user_allergies: undefined,
    user_surgeries: undefined,
    user_broken_members: undefined,
    feedInfos: function(user_data) {
        this.title = user_data.title;
        this.doc_name = user_data.doc_name;
        this.user_name = user_data.user_name;
        this.user_dateOfBirth = user_data.user_dateOfBirth;
        this.user_profession = user_data.user_profession;
        this.user_address = user_data.user_address;
        this.user_height = user_data.user_height;
        this.user_weight = user_data.user_weight;
        this.user_blood_type = user_data.user_blood_type;
        this.user_allergies = user_data.user_allergies;
        this.user_surgeries = user_data.user_surgeries;
        this.user_broken_members = user_data.user_broken_members;
    }
};

/* Options object for patient infos request */
var options = {
    url: 'https://healthsafe-api.herokuapp.com/api/stock',
    method: 'POST',
    json: {
        code: undefined
    }
};

/* GET info page */
router.get('/', function(req, res, next) {
    request(options, function(req, res, next) {
        infos.feedInfos(res.body);
        console.log(res.body);
    });
    res.render('info', {
        title: infos.title,
        doc_name: infos.doc_name,
        user_name: 'Paul' /*res.body.first_name + ' '+ stock.last*/ ,
        user_dateOfBirth: infos.user_dateOfBirth,
        user_profession: infos.user_profession,
        user_address: infos.user_address,
        user_height: infos.user_height,
        user_weight: infos.user_weight,
        user_blood_type: infos.user_blood_type,
        user_allergies: infos.user_allergies,
        user_surgeries: infos.user_surgeries,
        user_broken_members: infos.user_broken_members
    });
});

module.exports = router;