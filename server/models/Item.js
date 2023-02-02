const pool = require('../db');

module.exports = class Item {
    name;
    description;
    created;
    modified;

    constructor(name, description) {
        this.name = name;
        this.description = description;

        this.created = new Date(Date.now()).toDateString();
        this.modified = new Date(Date.now()).toDateString();
    }

    static async getAll() {
        const query = `SELECT * FROM item;`
        const result = await pool.query(query);
        if (result.rows.length) {
            return result.rows;
        }

        return null;
    }

    static async getOne(id) {
        const query = `SELECT * FROM item WHERE id = $1`;
        const result = await pool.query(query, [parseInt(id)]);
        if (result.rows.length) {
            return result.rows[0];
        }

        return null;
    }
}