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

    router.post('/login', async (req, res, next) => {
        try {
            const data = req.body;
            const response = await AuthController.login(data);

            if (!response || !response.ok) {
                res.status(response.code || 400).send(response.data || "Something went wrong");
            } else {
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
            req.session.destroy((err) => {
                if (err) throw err;
                req.logout((err) => {
                    if (err) return next(err);
                })
            })

            res.status(204).send({ ok: true });
        } catch (error) {
            next(error);
        }
    })

    return router;
}

module.exports = authRoute;