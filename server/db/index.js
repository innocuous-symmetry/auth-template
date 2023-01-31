const { Pool } = require("pg");
require('dotenv').config();

const constring = process.env.constring;

function main() {
    if (!constring) {
        throw new Error("Did not find connection string for database");
    }

    return new Pool({ connectionString: constring })
}

module.exports = main();
