const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

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

    // config for jwt strategy
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret'
    }

    // jwt strategy
    passport.use(new JwtStrategy(opts, async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }));

    return passport;
}

module.exports = passportLoader;