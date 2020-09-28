const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../_helpers/db');
const date = require('moment');
const User = db.User;

module.exports = {
    create
};

async function create(userParam) {
    if (await User.findOne({ email: userParam.email })) {
        throw 'User with this email: "' + userParam.email + '" already exists.';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    user.date = date().add(2, 'hours').format();

    await user.save();
}