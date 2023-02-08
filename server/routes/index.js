const jwt = require('jsonwebtoken');
const authRoute = require("./auth");
const itemRoute = require("./item");
const jwtRoute = require('./jwt');
const baseRoute = require('./base');

async function routesLoader(app, passport) {
    app.use('/app', (req, res, next) => {
        const token = req.headers['authorization']?.split(" ")[1];
        
        if (!token) {
            res.status(403).send("Unauthorized");
        } else {
            jwt.verify(token, process.env.SECRET, (err, data) => {
                if (err) {
                    res.status(403).send(err);
                } else {
                    req.user = data;
                    next();
                }
            })
        }
    })

    app.use('/', await baseRoute(app, passport));

    app.use('/auth', await authRoute(app, passport));
    app.use('/app', await itemRoute(app, passport));
    app.use('/jwt', await jwtRoute(app, passport));
}

module.exports = routesLoader;