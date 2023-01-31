const passport = require('passport');
const { Strategy } = require('passport-local');

async function passportLoader(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    })

    passport.deserializeUser((user, done) => {
        done(null, user);
    })

    passport.use(new Strategy(async (email, password, done) => {
        try {
            console.log(email, password);
        } catch (error) {
            return done(error);
        }
    }))
}

module.exports = passportLoader;