const session = require('express-session');
const express = require('express');
const pgSessionStore = require('../db/pgSessionStore');
const cors = require('cors');

require('dotenv').config();

const secret = process.env.SECRET;

async function expressLoader(app) {
    app.use(cors({ origin: "http://localhost:5173" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    if (!secret) {
        throw new Error("Express secret is undefined");
    }

    app.use(session({
        secret: secret,
        cookie: {
            maxAge: 8 * 60 * 60 * 1000,
            secure: false,
            httpOnly: false
        },
        resave: false,
        saveUninitialized: false,
        store: pgSessionStore(session)
    }))

    return app;
}

module.exports = expressLoader;