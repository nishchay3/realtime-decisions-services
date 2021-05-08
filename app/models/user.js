const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    "email": {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [(email) => {
            let emailRegex = /^[a-zA-Z0-9+_.-]{1,50}@[a-zA-Z0-9.-]{1,50}$/;
            emailRegex.test(email);
        }, 'Invalid email format']
    },
    "firstName": {
        type: String,
        validate: [(firstName) => {
            let firstNameRegex = /^[a-zA-Z]{1,50}$/;
            firstNameRegex.test(firstName);
        }, 'Invalid first name format']
    },
    "lastName": {
        type: String,
        validate: [(lastName) => {
            let lastNameRegex = /^[a-zA-Z]{1,50}$/;
            lastNameRegex.test(lastName);
        }, 'Invalid last name format']
    },
    "hash": { type: String },
    "salt": { type: String }
}, { collection: 'Users', timestamp: true });

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        exp: parseInt(expiry.getTime() / 1000)
    }, "NISHCHAY"); //Later remove the secret from the code
}

module.exports = userSchema;