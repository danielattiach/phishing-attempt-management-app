const authHandlers = require('../controllers/auth.controller');

module.exports = function (app) {
    app.route('/auth/register').post(authHandlers.register);
    app.route('/auth/login').post(authHandlers.login);
};
