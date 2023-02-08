const AuthController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
require('dotenv').config();

const secret = process.env.SECRET;

async function authRoute(app, passport) {
    router.post('/register', async (req, res) => {
        try {
            const data = req.body;
            const response = await AuthController.register(data);

            res.status(response.code).send(response.data);
        } catch (error) {
            console.log(error);
        }
    })

    router.post('/login', async (req, res, next) => {
        try {
            const data = req.body;
            let response = await AuthController.login(data);

            if (!response || !response.ok) {
                res.status(response.code || 400).send(response.data || "Something went wrong");
            } else {
                // flatten controller responses
                while (response.data) {
                    response = response.data;
                }

                console.log(response);

                req.user = response;
                req.session.user = response;

                // exclude sensitive data from being stored client side
                const safeUserData = {
                    id: response.id,
                    username: response.username,
                    email: response.email,
                    created: response.created,
                    modified: response.modified
                }

                const token = jwt.sign({ user: safeUserData }, secret);

                req.session.save((err) => {
                    return next(err);
                })

                console.log(req.session);

                res.cookie('token', token, { httpOnly: true });
                res.json({ token });
            }
        } catch (error) {
            next(error);
        }
    })

    router.delete('/logout', async (req, res, next) => {
        try {
            req.session = null;
            req.user = null;
            res.clearCookie('connect.sid').clearCookie('token');
            res.status(204).send("logout successful");
            res.end();
        } catch (error) {
            console.log(error);
        }
    })

    return router;
}

module.exports = authRoute;