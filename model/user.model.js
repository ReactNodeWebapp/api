const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            unique: false
        },
        lastName: {
            type: String,
            required: true,
            unique: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        telephoneNumber: {
            type: String,
            required: false
        }
    }
);

module.exports = mongoose.model('User', userSchema);