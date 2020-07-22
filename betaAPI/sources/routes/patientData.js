const express = require('express');
const router = express.Router();
const modelPatientData = require('../models/modelPatientData');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorPatientData = require('../controllers/validators/patientDataValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/* GET Connexion page. */

router.get('/', async function(req, res) {
        const result = await ctrlRead.findAllData(modelPatientData.modelPatientData)
                                        .then(result => {
                                                console.log(result); // DEBUG
                                                return res.status(200).send(result);
                                        })
                                        .catch(err => {
                                                console.log(err);
                                                return res.status(500).send(err);
                                        });
        //return res.status(200).send(result);
})

router.get('/patientDataId', async function(req, res) {
        try {
        const result = await ctrlRead.findUserByID(modelPatientData.modelPatientData, req.body._id);
        console.log("1")
        if (result) {
                const saveResult = result;
                // console.log(saveResult);
                console.log("2")

                const data = await ctrlDelete.findUserAndDelete(modelPatientData.modelPatientData, req.body._id);
                console.log("3")

                if (!data) {
                        console.log("4")

                        return res.status(500).send({Error: "Delete User (patientDataId) Failed."})
                }
                console.log("5")

        } else {
                return res.status(200).send({msg: "No data."})
        }
        console.log("6")

        return res.status(200).send(result);
        }
        catch(err) {
                return res.status(500).send(err.stack);

        }

})

/* POST Connexion page. */

router.post('/patientDataId', async function(req, res) {
        try {
        const result = await ctrlRead.findUserByID(modelPatientData.modelPatientData, req.body._id);
        if (result) {
                const saveResult = result;
                // console.log(saveResult);

                const data = await ctrlDelete.findUserAndDelete(modelPatientData.modelPatientData, req.body._id);

                if (!data) {
                        return res.status(500).send({Error: "Delete User (patientDataId post) Failed."})
                }

        } else {
                return res.status(200).send({msg: "No data."})
        }

        return res.status(200).send(result);
        }
        catch(err) {
                return res.status(500).send(err.stack);

        }

})

router.post('/create',
        [ctrlEValidatorPatientData.patientDataIsValid()],
        async function(req, res) {
                try {
                        const resultModelPatientData = new modelPatientData.modelPatientData(req.body);
                        const errorModelPatientData = await resultModelPatientData.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errorModelPatientData === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultModelPatientData); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                await resultModelPatientData.save();
                                return res.status(200).send(resultModelPatientData);
                        } else {
                                console.log(errorModelPatientData);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelPatientData, resultEValidatorHandlerError]);
                        }
                        // console.log(resultModelPatientData); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err);
                        // return res.status(500).send()
                }


        // try {
        //     const user = new userConnection(req.body)
        //     await user.save()
        //     const token = await user.generateAuthToken()
        //     console.log(user)
        //     res.status(201).send({ user})
        // } catch (error) {
        //     res.status(500).send(error)
        // }
})

/* DELETE Connexion page. */

router.delete('/delete', async function(req, res) {
        try {

                const result = await ctrlDelete.findUserAndDelete(modelPatientData.modelPatientData, req.body._id);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})

/* UPDATE Connexion page. */

router.put('/update',
        [ctrlEValidatorPatientData.patientDataIsValidPUT()],
        async function(req, res) {
                try {
                        const resultModelPatientData = new modelPatientData.modelPatientData(req.body);
                        const errorModelPatientData = await resultModelPatientData.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errorModelPatientData === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultModelPatientData); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                const updateResult = await ctrlUpdate.updateValueById(modelPatientData.modelPatientData, req.body._id, req.body);

                                return res.status(200).send(updateResult);
                        } else {
                                console.log(errorModelPatientData);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelPatientData, resultEValidatorHandlerError]);
                        }
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
                        // return res.status(500).send()
                }
})

module.exports = router;
