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
    try {
        const fName = req.body.firstName;
        const lName = req.body.lastName;

        if((fName.length < 4 && fName.length > 30) ||
            (lName.length < 4 && lName.length >30)){
            console.log("The name is ether to long or to short. Please, check the spelling");
            throw(500);
        }
         const docData = new modelDoc({
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
        const fName = req.body.lastName;
        const lName = req.body.lastName;

        if((fName.length < 4 && fName.length > 30) ||
            (lName.length < 4 && lName.length >30)){
            console.log("The name is ether to long or to short. Please, check the spelling");
            throw(500);
        }

        dbConnect.updateCollection("HealthSafe", "DoctorInformation", filter, newQuery, function (dbRes, err) {
            if (err) {
                console.log(err.stack);
                return res.status(500).send(err.stack);
            }
            else {
                // console.log(res);
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
        dbConnect.deleteInfoByJson("HealthSafe", "DoctorInformation", myQuery, function(result, err) {
                if(err)
                {
                        console.log("TEST : DELETE BY ID");
                        console.log(err.stack);
                        console.log("END TEST : DELETE BY ID");
                        return res.status(500).send(err.stack);
                }
                else
                {
                        console.log("TEST : DELETE BY ID");
                        console.log(result.value);
                        console.log("END TEST : DELETE BY ID");
                        return res.status(200).send(result.value);
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
