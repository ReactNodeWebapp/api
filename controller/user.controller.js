const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

// routes
router.post('/registration', register);
router.post('/authentication', authenticate);

module.exports = router;

function register(req, res) {
    console.log(req.body)
    userService.create(req.body)
        .then(() => {
            res.status(200).send({message: 'New user is successfully added to the database!'});
        })
        .catch(err => {
            res.json({message: err});
            console.log(err);
        });
}

function authenticate(req, res) {
    console.log(req.body)
    userService.authenticate(req.body)
        .then((user) => {
            res
                .status(200)
                .json({user, message: "Successful login.", hasErrors: false});
        })
        .catch((err) => {
            res
                .status(400)
                .json({message: err, hasErrors: true});
            console.log(err);
        })
}

