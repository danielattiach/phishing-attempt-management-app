'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const PhishingAttemptSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    sentByUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    emailContent: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['sent', 'clicked'],
        default: 'sent',
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
    clickedAt: {
        type: Date,
    },
});

mongoose.model('PhishingAttempt', PhishingAttemptSchema);
