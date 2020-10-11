const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

// routes
router.post('/registration', register);
router.post('/authentication', authenticate);
router.post('/profile', getUserProfile);
router.get('/status', checkJwtStatus)
router.post('/logout', logout);
router.put("/:id", update);

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
    userService.getUserProfile(req)
        .then((user) => {
            res
                .status(200)
                .json({
                    user,
                    message: "Successful authorization for getting user profile.",
                    hasErrors: false
                });
        })
        .catch(err => {
            next(err);
        });
}

function logout(req, res, next) {
    res.clearCookie("token");
    res.send({ success: true });
}

function checkJwtStatus(req, res, next) {
    userService.checkJwtStatus(req)
        .then((user) => {
            res
                .status(200)
                .json({
                    user,
                    status: true,
                    message: "Successful authorization.",
                    hasErrors: false
                });
        })
        .catch(err => {
            next(err);
        });
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

