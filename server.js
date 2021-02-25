const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { viewTable } = require('./lib/queries');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees_db',
    password: 'HbibcWfloah801'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    promptOptions();
});

console.log(`
╔═════════════════════╗
║                     ║
║  Employee Database  ║
║                     ║
╚═════════════════════╝
`);

const promptOptions = () => {
    return inquirer
    .prompt([{
        type: 'list',
        name: 'chooseTable',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Exit']
    }])
    .then(({ chooseTable }) => {
        if (chooseTable === 'View Departments') {
            console.log(`
╔═══════════════╗
║  Departments  ║
╚═══════════════╝
`);
            connection.query(viewTable('departments'),
                function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    return promptOptions();
                });
            // connection.end();
        }
        else if (chooseTable === 'View Roles') {
            console.log(`
╔═════════╗
║  Roles  ║
╚═════════╝
`);
            connection.query(viewTable('roles'),
                function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    return promptOptions();
                });
                // connection.end();
        }
        else if (chooseTable === 'View Employees') {
            console.log(`
╔═════════════╗
║  Employees  ║
╚═════════════╝
`);
            connection.query(viewTable('employees'),
                function (err, results) {
                    if (err) throw err;
                    console.table(results);
                    return promptOptions();
                });
                // connection.end();
        }
        else {
            console.log('✶ Exiting employee database ✶');
            connection.end();
        }
    });
};