const pool = require('../db');

module.exports = class User {
    username;
    email;
    password;
    created;
    modified;

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.created = new Date(Date.now()).toDateString();
        this.modified = new Date(Date.now()).toDateString();
    }

    presentAsArray() {
        return [this.username, this.email, this.password];
    }

    static async getOne(id) {
        const query = `SELECT * FROM appuser WHERE id = $1`;
        const result = await pool.query(query, [id]);
        if (result.rows.length) {
            return result.rows[0];
        }

        return null;
    }

    static async getOneByEmail(email) {
        const query = `SELECT * FROM appuser WHERE email = $1`;
        const result = await pool.query(query, [email]);
        if (result.rows.length) {
            return result.rows[0];
        }

        return null;
    }

    static async getAll() {
        const query = `SELECT * FROM appuser;`;
        const result = await pool.query(query);
        if (result.rows.length) {
            return result.rows;
        }

        return null;
    }

    static async create(data) {
        let result;
        const query = `INSERT INTO appuser (username, email, password) VALUES ($1, $2, $3) RETURNING *`;

        if (!data instanceof User) {
            const newUser = new User(data.username, data.email, data.password);
            result = await pool.query(query, newUser.presentAsArray());
        } else {
            result = await pool.query(query, data.presentAsArray());
        }

        return result.rows;
    }

    static async login() {

    }

    static async logout() {

    }

    static async register() {

    }
}