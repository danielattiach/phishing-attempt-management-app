const mongoose = require('mongoose')
const PhishingAttempt = mongoose.model('PhishingAttempt');
const { createPhishingAttemptUrl } = require('../utils/url');

exports.sendPhishingAttempt = function (req, res, next) {
    const id = mongoose.Types.ObjectId();
    const phishingAttempt = new PhishingAttempt({
        _id: id,
        email: req.body.email,
        sentByUser: req.user._id,
        emailContent: `Want a free iPhone? Just click here: ${createPhishingAttemptUrl(id)}`,
    });
    phishingAttempt.save(function (err, phishingAttempt) {
        if (err) {
            return res.status(400).send({
                message: err,
            });
        } else {
            return res.json(phishingAttempt);
        }
    });
};

exports.clickPhishingAttemptLink = function (req, res, next) {
    PhishingAttempt.findById(req.params.phishingAttemptID, function (err, phishingAttempt) {
        if (err) return res.status(404);

        phishingAttempt.status = 'clicked';
        phishingAttempt.clickedAt = Date.now();
        phishingAttempt.save(function (err) {
            if (err) return res.status(404)

            return res.json({
                message: 'You are not very smart, are you?',
            });
        });
    });
}

exports.getPhishingAttempts = function (req, res, next) {
    PhishingAttempt.find({}, function (err, phishingAttempts) {
        if (err) {
            console.log(err)
            return res.status(404)
        };

        return res.json(phishingAttempts);
    });
}
