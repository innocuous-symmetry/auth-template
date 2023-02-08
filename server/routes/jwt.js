const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

async function jwtRoute(app, passport) {
    router.get('/', (req, res) => {
        const user = req.user;
        if (!user) {
            res.status(403).send("Unauthorized");
        } else {
            const token = jwt.sign({ user: req.user }, secret);
            res.cookie('token', token, { httpOnly: true });
            res.json({ token });
        }
    });

    return router;
}

module.exports = jwtRoute;