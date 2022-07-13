const phishingAttemptHandlers = require('../controllers/phishingAttempt.controller');
const authHandlers = require('../controllers/auth.controller');

module.exports = function(app) {
    app.route('/phishingAttempt').post(authHandlers.loginRequired, phishingAttemptHandlers.sendPhishingAttempt);
    app.route('/phishingAttempts').get(authHandlers.loginRequired, phishingAttemptHandlers.getPhishingAttempts);
    app.route('/collect_your_free_iphone/:phishingAttemptID').get(phishingAttemptHandlers.clickPhishingAttemptLink);
};
