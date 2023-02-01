const authRoute = require("./auth");
const itemRoute = require("./item");

async function routesLoader(app, passport) {
    const authRouter = await authRoute(app, passport);
    const itemRouter = await itemRoute(app, passport);

    app.get('/', (req, res) => {
        res.send(req.session);
    })

    app.use('/auth', authRouter);
    app.use('/app', passport.authenticate('local'), itemRouter);
}

module.exports = routesLoader;