const routesLoader = require("../routes");
const expressLoader = require("./express");
const passportLoader = require("./passport");

async function loaders(app) {
    const expressApp = await expressLoader(app);
    const passportApp = await passportLoader(expressApp);
    await routesLoader(expressApp, passportApp);
}

module.exports = loaders;