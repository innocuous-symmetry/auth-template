const Item = require('../models/Item');
const ControllerResponse = require('./ControllerResponse');

module.exports = class ItemController {
    static async getAll() {
        const result = await Item.getAll();

        const ok = result !== null;
        const code = ok ? 200 : 404;
        const data = ok ? result : "No items found";

        return new ControllerResponse(ok, data, code);
    }

    static async getOne(id) {
        const result = await Item.getOne(id);

        const ok = result !== null;
        const code = ok ? 200 : 404;
        const data = ok ? result : ("No item found with ID " + id);

        return new ControllerResponse(ok, data, code);
    }
}