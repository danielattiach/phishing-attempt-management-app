const userHandlers = require('../controllers/user.controller');
const authHandlers = require('../controllers/auth.controller');

module.exports = function(app) {
    app.route('/user/getUser').get(authHandlers.loginRequired, userHandlers.getUser);
};
