require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models/');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const phishingAttemptRoutes = require('./routes/phishingAttempt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log('Successfully connect to MongoDB.');
    })
    .catch(err => {
        console.error('Connection error', err);
        process.exit();
    });

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

authRoutes(app);
userRoutes(app);
phishingAttemptRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
