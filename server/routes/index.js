const authRoute = require("./auth");
const itemRoute = require("./item");

async function routesLoader(app, passport) {
    app.use('/', (req, res, next) => {
        console.log(req.user || "no user");
        next();
    })

    app.get('/', (req, res) => {
        res.send(req.session);
    })

    app.use('/auth', await authRoute(app, passport));
    app.use('/app', await itemRoute(app, passport));
}

module.exports = routesLoader;