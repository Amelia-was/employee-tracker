const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees_db',
    password: 'HbibcWfloah801'
});

module.exports = { connection };