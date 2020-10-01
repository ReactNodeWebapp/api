const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../_helpers/db');
const jwtConfig = require('../config/jwt.config')
const date = require('moment');
const User = db.User;

module.exports = {
    create,
    authenticate
};

async function create(userParam) {
    if (await User.findOne({ email: userParam.email })) {
        throw 'ALREADY_EXISTING_USER';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    user.date = date().add(2, 'hours').format();

    await user.save();
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });

    if(!user) {
        throw 'NOT_REGISTERED';
    } else if(!bcrypt.compareSync(password, user.password)) {
        throw 'BAD_CREDENTIAL';
    } else if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id }, jwtConfig.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}