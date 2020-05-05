var express = require('express');
var router = express.Router();
var dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
var modelDoc = require('../DB/models/doctorModel.js');
var mongo = require('mongodb');

router.get('/', function(req, res, next) {
           try
           {
           var dbConnect= new dbCRUD();
           console.log("TEST : READ COLLECTION");
           dbConnect.readCollection("HealthSafe", "DoctorInformation", function(result, err) {
                if(err)
                {
                        console.log(err.stack);
                        return res.status(500).send(err.stack);
                }
                else
                {
                        // displaying in console json
                        console.log(result);
                        // console.log("TEST FINISH : READ COLLECTION");
                        return res.status(200).send(result);
                        // or without return
                }
            })
           }
           catch(err)
           {
           console.log(err.stack);
           return res.status(500).send(err.stack);
           }
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    try {
        const email = req.body.emailAddr;

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        if (validateEmail(email)) {
            const docData = new modelDoc(
                {
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    emailAddr: req.body.emailAddr,
                    gender: req.body.gender,
                    age: req.body.age,
                    expDomaine: req.body.expDomaine,
                    address: req.body.address,
                    medicalId: req.body.medicalId
                }).save(function (err, result) {
                if (err) {
                    console.log(err.stack);
                    return res.status(500).send(err.stack);
                }
                else {
                    console.log(result);
                    return res.status(200).send(result._id);
                }

            });
        }
        else {
            console.log("ERROR : email not correct");
            return res.status(500);
        }
    }
    catch(err)
    {
        console.log(err.stack);
        return res.status(500).send(err.stack);
    }
});

router.put('/', function (req, res, next) {
    try {
        // Duplication of body for handling newQuery update
        const newBody = {...req.body};
        delete newBody._id;

        dbConnect = new dbCRUD();
        const id = req.body._id;
        var filter = { _id: new mongo.ObjectId(id) };
        var newQuery = {$set:newBody};

        dbConnect.updateCollection("HealthSafe", "DoctorInformation", filter, newQuery, function (dbRes, err) {
            if(err)
            {
                console.log(err.stack);
                return res.status(500).send(err.stack);
            }
            else
            {
                console.log(res);
                return res.status(200).send(dbRes);
            }
        });
    }
    catch (err)
    {
        console.log("ERROR while deleting :\n" + err.stack);
        return res.status(500).send(err.stack);
    }
});

router.delete('/', function(req, res, next) {
    try {
        dbConnect = new dbCRUD();
        const id = req.body._id;
        var myQuery = { _id: new mongo.ObjectId(id) };
        dbConnect.deleteInfoByJson("HealthSafe", "DoctorInformation", myQuery, function(dbRes, err) {
                if(err)
                {
                        console.log(err.stack);
                        return res.status(500).send(err.stack);
                }
                else
                {
                        console.log(res.value);
                        return res.status(200).send(dbRes.value);
                }
        });
    }
    catch (err)
    {
        console.log("ERROR while deleting :\n" + err.stack);
        return res.status(500).send(err.stack);
    }
});

module.exports = router;
