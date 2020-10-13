const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../_helpers/db');
const jwtConfig = require('../config/jwt.config')
const date = require('moment');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const multer = require('multer');
const User = db.User;

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
    create,
    authenticate,
    getUserProfile,
    checkJwtStatus,
    update,
    updateUserImage,
    getUserImage
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
        const token = jwt.sign({ sub: user.id }, jwtConfig.secret, { expiresIn: 60*60 });

        user.date = date().add(2, 'hours').format();

        return {
            user,
            token
        };
    }
}

async function getUserProfile(req) {
    const token = req.cookies.token;

    if (!token) {
        throw 'NO_TOKEN';
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);

        return decoded;
    } catch (err) {
        throw 'EXPIRED_SESSION';
    }
}

async function update(id, data) {
    const user = await User.findById(id);

    // MAKE THIS SO ONLY CHANGED DATA IS SAVED
    Object.assign(user, data);

    await user.save();

    return user;
}

async function updateUserImage(id, image) {
    const response = await cloudinary.uploader.upload(image, {
        upload_preset: 'ml_default'
    });

    const user = await User.findById(id);
    user.userImageUrl = response.secure_url;

    await user.save();

    return user.userImageUrl;
}

async function getUserImage(id) {
    const user = await User.findById(id);

    return user.userImageUrl;
}

async function checkJwtStatus(req) {
    const token = req.cookies.token;

    if (!token) {
        throw 'NO_TOKEN';
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);

        req.user = decoded;

        return req.user;
    } catch (err) {
        throw 'EXPIRED_SESSION';
    }
}