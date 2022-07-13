'use strict';

const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User'),
    config = require('../config');

exports.register = function (req, res) {
    const newUser = new User(req.body);
    newUser.passwordHash = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err,
            });
        } else {
            user.passwordHash = undefined;
            return res.json(user);
        }
    });
};

exports.login = function (req, res) {
    User.findOne(
        {
            email: req.body.email,
        },
        function (err, user) {
            if (err) throw err;
            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
            }
            delete user.passwordHash;
            return res.json({
                token: jwt.sign(
                    { email: user.email, firstName: user.firstName, lastName: user.lastName, _id: user._id },
                    config.secret,
                ),
                user,
            });
        },
    );
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
};
