const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

// routes
router.post('/registration', register);
router.post('/authentication', authenticate);
router.get('profile', getUserProfile)

module.exports = router;

function register(req, res, next) {
    userService.create(req.body)
        .then(() => {
            res
                .status(200)
                .send({
                    message: 'New user is successfully added to the database.',
                    hasErrors: false
                });
        })
        .catch(err => {
            next(err);
        });
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((user) => {
            console.log(user)
            res
                .status(200)
                .cookie("token", user.token, { httpOnly: true })
                .json({
                    user: user.user,
                    message: "Successful login.",
                    hasErrors: false
                });
        })
        .catch(err => {
            next(err);
        });
}

function getUserProfile(req, res, next) {
    userService.authenticate(req.body)
        .then((user) => {
            console.log(user);
            res
                .status(200)
                .cookie("token", user.token, { httpOnly: true })
                .json({
                    user,
                    message: "Successful login.",
                    hasErrors: false
                });
        })
        .catch(err => {
            next(err);
        });
}

