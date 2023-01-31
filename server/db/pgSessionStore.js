const connectPgSimple = require('connect-pg-simple');
const pool = require('.');

function pgSessionStore(s) {
    const pgSession = connectPgSimple(s)

    return new pgSession({
        pool: pool,
        tableName: "pgsessions",
        createTableIfMissing: true
    })
}

module.exports = pgSessionStore;