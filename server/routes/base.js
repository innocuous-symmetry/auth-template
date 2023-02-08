const router = require('express').Router();
require('dotenv').config();

const secret = process.env.SECRET;

async function baseRoute(app, passport) {
    router.get('/', async (req, res, next) => {
        try {
            console.log(req.session);
            const user = undefined;

            if (!user) {
                res.status(403).send("Not authorized");
            } else {
                res.status(200).send({ token: req.token, user: req.user });
            }
        } catch (error) {
            console.log(error);
        }
    })

    return router;
}

module.exports = baseRoute;