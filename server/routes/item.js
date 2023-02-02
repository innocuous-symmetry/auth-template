// const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = require('express').Router();
const ItemController = require('../controllers/ItemController');

async function itemRoute(app, passport) {
    /* router.use('/', (req, res, next) => {
        const token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) {
                res.status(403).send(err);
            } else {
                req.user = data;
                next();
            }
        })
    }) */

    router.get('/item', async (req, res) => {
        const response = await ItemController.getAll();
        const { data, code } = response;
        res.status(code).send(data);
    })

    router.get('/item/:id', async (req, res) => {
        const { id } = req.params;
        const { data, code } = await ItemController.getOne(id);
        res.status(code).send(data);
    })

    return router;
}

module.exports = itemRoute;