const fs = require('fs');
const path = require('path');
const pool = require('.');

require('dotenv').config();

const root = path.resolve(__dirname);

async function seed() {
    console.clear();

    const createUserTable = fs.readFileSync(root + "/sql/create/createUserTable.sql").toString();
    const createItemTable = fs.readFileSync(root + "/sql/create/createItemTable.sql").toString();
    const populateItemTable = fs.readFileSync(root + "/sql/populate/populateItemTable.sql").toString();

    try {
        for (let statement of [createUserTable, createItemTable, populateItemTable]) {
            await pool.query(statement);
        }
    } catch(error) {
        console.log(error);
        process.exit(0);
    }

    console.log("Database seed successful.");
    process.exit(1);
}

seed();