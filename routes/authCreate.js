var express = require('express');
var router = express.Router();
var request = require('request-promise');

/* GET authCreate page */
router.get('/', function(req, res) {
    res.render('authCreate', { title: 'Express' });
});

/* options object for the request */
var options = {
    url: 'https://healthsafe-api-beta.herokuapp.com/api/signup/create',
    method: 'POST',
    json: {
        lastName: undefined,
        firstName: undefined,
        age: undefined,
        phoneNumber: undefined,
        address: [{
            streetNumber: undefined,
            typeStreetNumber: undefined,
            typeStreet: undefined,
            street: undefined,
            zipCode: undefined,
            city: undefined,
            country: undefined,
        }],
        email: undefined,
        password: undefined,
        confirmationPassword: undefined,
        expertiseDomain: undefined,
        idNumber: undefined
    },
    feedJson: function(data) {
        this.json.lastName = data.lastname;
        this.json.firstName = data.firstname;
        this.json.age = data.age;
        this.json.phoneNumber = data.phoneNumber;
        this.json.address[0].zipCode = data.zipCode;
        this.json.address[0].city = data.city;
        this.json.address[0].country = data.country;
        this.json.email = data.email;
        this.json.password = data.password;
        this.json.confirmationPassword = data.confirmationPassword;
        this.json.expertiseDomain = data.expertiseDomain;
        this.json.idNumber = data.idNumber;
    },
    feedAddress: function(data) {
        var tab = data.split(' ');
        var i = 0;
        if (!Number.isNaN(tab[0])) {
            this.json.address[0].streetNumber = parseInt(tab[0]);
            i++;
        }
        if (tab[1].localeCompare("rue") === 0 ||
            tab[1].localeCompare("avenue") === 0 ||
            tab[1].localeCompare("boulevard") === 0 ||
            tab[1].localeCompare("chemin") === 0) {
            this.json.address[0].typeStreet = tab[1];
            this.json.address[0].typeStreetNumber = "";
            i++;
        } else if (tab[1].localeCompare("bis") === 0 ||
            tab[1].localeCompare("ter") === 0) {
            this.json.address[0].typeStreetNumber = tab[1];
            i++;
            if (tab[2].localeCompare("rue") === 0 ||
                tab[2].localeCompare("avenue") === 0 ||
                tab[2].localeCompare("boulevard") === 0 ||
                tab[2].localeCompare("chemin") === 0) {
                this.json.address[0].typeStreet = tab[2];
                i++;
            }
        }
        if (tab.length - i === 1) {
            this.json.address[0].street = tab[i];
        } else {
            var name = ""
            while (i < tab.length) {
                name = name.concat(tab[i]);
                if (i + 1 !== tab.length) {
                    name = name.concat(' ');
                }
                i++;
            }
            this.json.address[0].street = name;
        }
    }
};

/* await function that wait for the request to end */
async function performRequest(res) {
    await request(options)
        .then(function(res) {
            //do something
        })
        .catch(function(err) {
            console.log(err);
        })
    res.redirect('/');
    res.end();
};

/* POST route to get front data and send them to the API */
router.post('/login', (req, res) => {
    console.log(req.body);
    /*options.feedAddress(req.body.address);
    options.feedJson(req.body);
    console.log(options.json);
    performRequest(res);*/
});

module.exports = router;