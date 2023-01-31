const express = require("express");
const loaders = require("./loaders");
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

async function main() {
    try {
        await loaders(app);
        app.listen(PORT, () => {
            console.log("Listening on port " + PORT);
        })
    } catch(err) {
        console.log(err);
        process.exit(0);
    }
}

main();