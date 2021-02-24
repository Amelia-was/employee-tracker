const { connection } = require('./db');
const cTable = require('console.table');

// simple query
const viewTable = (table) => {
    connection.query(
    `SELECT * FROM ${table}`,
    function (err, results) {
        return console.table(results);
    }
)};

module.exports = { viewTable };