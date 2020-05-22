const express = require('express');
const mongo = require('mongodb');
const router = express.Router();
const dbCRUD = require('../DB/Controllers/dbCRUD').dbCRUD;
const modelDoc = require('../DB/models/doctorModel.js');
const dbConnect = new dbCRUD();

router.get('/', (req, res) => {
    try {
        console.log("TEST : READ COLLECTION");
        dbConnect.readCollection("HealthSafe", "DoctorInformation", function (result, err) {
            if (err) {
                console.error(err);
                return res.status(500).send("Ooops ! Something went wrong when displaying the model.");
            }
            else {
                // displaying in console json
                console.log(result);
                // console.log("TEST FINISH : READ COLLECTION");
                return res.status(200).send(result);
                // or without return
            }
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Ooops ! Something went wrong when displaying the model.");
    }
});

router.post('/', (req, res) => {
    try {
        const fName = req.body.firstName;
        const lName = req.body.lastName;

        function checkSize(name) {
            if ((name.length < 4) || (name.length > 30))
                return false;
            return true;
        }
        if (checkSize(fName) && checkSize(lName)) {
            const docData = new modelDoc({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                emailAddr: req.body.emailAddr,
                gender: req.body.gender,
                birthday: req.body.birthday,
                expDomaine: req.body.expDomaine,
                address: req.body.address,
                medicalId: req.body.medicalId
            }).save(function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error while creating");
                }
                else {
                    console.log(result);
                    return res.status(200).send(result._id);
                }
            });
        }
        else
            return res.status(500).send('Error: The name is ether to long or to short. Please, check the spelling.');
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error while creating this new element in the database.");
    }
});

router.put('/', (req, res) => {
    try {
        // Duplication of body for handling newQuery update
        const newBody = { ...req.body };
        delete newBody._id;

        function checkSize(name) {
            if ((name.length < 4) || (name.length > 30))
                return false;
            return true;
        }

        const id = req.body._id;
        console.log(id);
        if (id) {
            // dbConnect = new dbCRUD();
            const filter = { _id: new mongo.ObjectId(id) };
            const newQuery = { $set: newBody };
            const fName = req.body.firstName;
            const lName = req.body.lastName;

            if (checkSize(fName) && checkSize(lName)) {
                console.log(newQuery);
                dbConnect.updateCollection("HealthSafe", "DoctorInformation", filter, newQuery, (dbRes, err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Error while updating");
                    }
                    else {
                        // console.log(res);
                        return res.status(200).send(dbRes);
                    }
                });
            }
            else
                return res.status(500).send('Error: The name is ether to long or to short. Please, check the spelling');
        }
        else
            return res.status(500).send('Error : Missing ID to update');
    }
    catch (err) {
        console.error("ERROR while updating :\n" + err);
        return res.status(500).send('An error occurs while updating data');
    }
});

router.delete('/', (req, res) => {
    try {
        const id = req.body._id;
        if (id) {
            // dbConnect = new dbCRUD();
            const myQuery = { _id: new mongo.ObjectId(id) };

            dbConnect.deleteInfoByJson("HealthSafe", "DoctorInformation", myQuery, (result, err) => {
                if (err) {
                    console.log("TEST : DELETE BY ID");
                    console.error(err);
                    console.log("END TEST : DELETE BY ID");
                    return res.status(500).send(err);
                }
                else {
                    console.log("TEST : DELETE BY ID");
                    console.log(result.value);
                    console.log("END TEST : DELETE BY ID");
                    return res.status(200).send(result.value);
                }
            });
        }
        else
            return res.status(500).send('Error : Missing ID to update');
    }
    catch (err) {
        console.error("ERROR while deleting :\n" + err);
        return res.status(500).send(err);
    }
});

module.exports = router;
