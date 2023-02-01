const AuthController = require('../controllers/authController');

const router = require('express').Router();

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

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const data = req.body;
            const response = await AuthController.login(data);

            if (!response || !response.ok) {
                res.status(response.code || 400).send(response.data || "Something went wrong");
            } else {
                req.user = response.data;
                req.session.user = response.data;
                req.session.save((err) => {
                    return next(err);
                })

                res.send(response.data);
            }
        } catch (error) {
            next(error);
        }
    })

    router.delete('/logout', async (req, res, next) => {
        try {
            req.session = null;
            req.user = null;
            res.status(200).clearCookie('connect.sid');
            res.end();
        } catch (error) {
            console.log(error);
        }
    })

    return router;
}

module.exports = authRoute;