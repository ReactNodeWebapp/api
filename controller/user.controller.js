const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

// routes
router.post('/registration', register);
router.post('/authentication', authenticate);

module.exports = router;

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.status(200).json({ message: 'New user is successfully added to the database!' }))
        .catch(err => res.json({ message: err }));
}

function authenticate(eq, res, next) {

}

