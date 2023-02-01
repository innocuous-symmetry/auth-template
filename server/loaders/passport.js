const passport = require('passport');
const { Strategy } = require('passport-local');
const AuthController = require('../controllers/authController');

async function passportLoader(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    passport.use(new Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
        try {
            const response = await AuthController.login({ email: email, password: password });
            if (response && response.ok) {
                return done(null, response.data.data);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error);
        }
    }))

    return passport;
}

module.exports = passportLoader;