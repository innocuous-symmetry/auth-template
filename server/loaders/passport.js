const passport = require('passport');
const { Strategy } = require('passport-local');
const AuthController = require('../controllers/authController');

async function passportLoader(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        process.nextTick(() => {
            done(null, user);
        })
    })

    passport.deserializeUser((user, done) => {
        process.nextTick(() => {
            done(null, user);
        })
    })

    passport.use(new Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
        console.log('calling local strategy');
        console.log(email, password);

        try {
            console.log('before response')
            const response = await AuthController.login({ email: email, password: password });
            console.log(response);
            
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