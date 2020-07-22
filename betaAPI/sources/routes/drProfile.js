const express = require('express');
const router = express.Router();
const modelDrProfile = require('../models/modelDrProfile');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorDrProfile = require('../controllers/validators/drProfileValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/* GET Connexion page. */

router.get('/', async function(req, res) {
        //
        const result = await ctrlRead.findAllData(modelDrProfile.modelDrProfile)
                                        .then(result => {
                                                console.log(result); // DEBUG
                                                if (result == '[]') {
                                                        return resolve(res.status(202).send(result));

                                                } else {
                                                        return res.status(200).send(result);
                                                }
                                        })
                                        .catch(err => {
                                                console.log(err);
                                                return res.status(500).send(err);
                                        });
})

router.get('/drProfileId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelDrProfile.modelDrProfile, req.body._id)
        return res.status(200).send(result);

})

/* POST Connexion page. */

router.post('/drProfileId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelDrProfile.modelDrProfile, req.body._id)
        return res.status(200).send(result);

})

router.post('/create',
        [ctrlEValidatorDrProfile.drProfileIsValid()],
        async function(req, res) {
                try {
                        const resultmodelDrProfile = new modelDrProfile.modelDrProfile(req.body);
                        const errormodelDrProfile = await resultmodelDrProfile.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errormodelDrProfile === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultmodelDrProfile); //DEBUG
                                await resultmodelDrProfile.save();
                                return res.status(200).send(resultmodelDrProfile);
                        } else {
                                console.log(errormodelDrProfile);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errormodelDrProfile, resultEValidatorHandlerError]);
                        }
                        // console.log(resultmodelDrProfile); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).end();
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

                const result = await ctrlDelete.findUserAndDelete(modelDrProfile.modelDrProfile, req.body._id);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})

/* UPDATE Connexion page. */

router.put('/update',
        [ctrlEValidatorDrProfile.drProfileIsValidPUT()],
        async function(req, res) {

                try {
                        const resultModelDrProfile = new modelDrProfile.modelDrProfile(req.body);
                        const errorModelDrProfile = await resultModelDrProfile.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        if (errorModelDrProfile === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log(resultModelDrProfile); //DEBUG
                                        console.log(resultEValidatorHandlerError.errors); //// DEBUG
                                const updateResult = await ctrlUpdate.updateValueById(modelDrProfile.modelDrProfile, req.body._id, req.body);

                                return res.status(200).send(updateResult);
                        } else {
                                console.log(errorModelDrProfile);
                                console.log("FFF");

                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelDrProfile, resultEValidatorHandlerError]);
                        }
                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
                        // return res.status(500).send()
                }
})

module.exports = router;
