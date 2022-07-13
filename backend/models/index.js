const db = {};
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
db.mongoose = mongoose;
db.user = require('./user.model');
db.phishingAttempt = require('./phishingAttempt.model');

module.exports = db;
