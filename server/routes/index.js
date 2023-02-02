const authRoute = require("./auth");
const itemRoute = require("./item");

async function routesLoader(app, passport) {
    app.use('/auth', await authRoute(app, passport));
    app.use('/app', await itemRoute(app, passport));
}

module.exports = routesLoader;