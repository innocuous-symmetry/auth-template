const router = require('express').Router();

function itemRoute(app, passport) {
    app.use('/app/items', router);

    router.get('/', (req, res) => {
        res.status(200).send('items');
    })
}