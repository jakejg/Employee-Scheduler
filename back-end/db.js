const { DB_URI } = require('./config');
const { client, Client } = require('pg');

let db = new Client({
        connectionString: DB_URI
    })
db.connect();

module.exports = db;