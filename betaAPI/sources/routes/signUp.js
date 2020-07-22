const express = require('express');
const router = express.Router();
const modelSignup = require('../models/modelSignup');
const modelDrProfile = require('../models/modelDrProfile');
const ctrlRead = require('../controllers/read/ctrlRead');
const ctrlDelete = require('../controllers/delete/ctrlDelete');
const ctrlUpdate = require('../controllers/update/ctrlUpdate');
const ctrlEValidatorSignup = require('../controllers/validators/signupValidator');
const ctrlEValidatorErrorHandler = require('../controllers/validators/errorHandler/ctrlEValidatorErrorHandler');

/* GET Connexion page. */

router.get('/', async function(req, res) {
        // TODO : convert to Promesse
        try {
                const result = await ctrlRead.displayAllSignup(modelSignup.modelSignup);
                if (result == '[]') {
                        const msg = { msg: "There are no data.", result: result };
                        return res.status(204).send(msg);

                } else {
                        return res.status(200).send(msg)
                }
        } catch (err) {
                return res.status(500).send(err.stack)
        }

})

router.get('/signupId', async function(req, res) {

        const result = await ctrlRead.findUserByID(modelSignup.modelSignup, req.body._id)
        return res.status(200).send(result);

})

/* POST Connexion page. */

router.post('/create',
        [ctrlEValidatorSignup.signupIsValid()],
        async function(req, res) {
                try {
                        const resultModelSignup = new modelSignup.modelSignup(req.body);
                        const errorModelSignup = await resultModelSignup.validateSync();
                        const resultEValidatorHandlerError = await ctrlEValidatorErrorHandler.eValidatorErrorHandler(req);

                        // console.log("END DEBUG")
                        if (errorModelSignup === undefined &&
                                JSON.stringify(resultEValidatorHandlerError.errors) === "[]") {
                                        console.log("TEST : " + resultModelSignup); //DEBUG
                                        await resultModelSignup.save();

                                        const resultModelDrProfile = new modelDrProfile.modelDrProfile(req.body);
                                        await resultModelDrProfile.save();
                                        // const token = await user.generateAuthToken()




                                        return res.status(200).send(resultModelSignup);
                        } else {
                                console.log(errorModelSignup);
                                console.log(resultEValidatorHandlerError);
                                return res.status(500).send([errorModelSignup, resultEValidatorHandlerError]);
                        }
                        // console.log(resultModelSignup); //DEBUG

                } catch (err) {
                        console.log(err);
                        return res.status(500).send(err.stack);
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

                const result = await ctrlDelete.findUserAndDelete(modelSignup.modelSignup, req.body._id);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err);
                // return res.status(500).send()
        }
})

/* UPDATE Connexion page. */

router.put('/update', async function(req, res) {
        try {
                const result = await ctrlUpdate.updateValueById(modelSignup.modelSignup, req.body._id, req.body);

                return res.status(200).send(result);
        } catch (err) {
                console.log(err);
                return res.status(500).send(err.stack);
                // return res.status(500).send()
        }
})

module.exports = router;
