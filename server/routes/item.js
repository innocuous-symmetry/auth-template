const router = require('express').Router();
const ItemController = require('../controllers/ItemController');

function itemRoute(app, passport) {
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