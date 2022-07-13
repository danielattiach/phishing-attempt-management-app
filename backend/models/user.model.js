'use strict';

const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    passwordHash: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

mongoose.model('User', UserSchema);
