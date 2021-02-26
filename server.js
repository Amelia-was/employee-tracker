const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// queries
const { 
    viewTable, 
    viewRoles, 
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    getDeptId } = require('./lib/queries');

const { get } = require('http');

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
    console.log(`
    ╔═════════════════════╗
    ║                     ║
    ║  Employee Database  ║
    ║                     ║
    ╚═════════════════════╝
    `);
    promptOptions();
});


const promptOptions = () => {
    return inquirer
    .prompt([{
        type: 'list',
        name: 'chooseOption',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Update Departments', 'Update Roles', 'Exit']
    }])
    .then(({ chooseOption }) => {
        if (chooseOption === 'View Departments') {
            console.log(`
╔═══════════════╗
║  Departments  ║
╚═══════════════╝
`);
            connectDb(viewTable('departments'), [], true);
        }
        else if (chooseOption === 'View Roles') {
            console.log(`
╔═════════╗
║  Roles  ║
╚═════════╝
`);
            connectDb(viewRoles(), [], true);
        }
        else if (chooseOption === 'View Employees') {
            console.log(`
╔═════════════╗
║  Employees  ║
╚═════════════╝
`);
            connectDb(viewEmployees(), [], true);
        }
        else if (chooseOption === 'Update Departments') {
            promptDeptOptions();
        }
        else if (chooseOption === 'Update Roles') {
            promptRoleOptions();
        }
        else {
            console.log('\n✶ Exiting employee database ✶\n');
            connection.end();
        }
    });
};

// connect to database and make query
const connectDb = (queryFn, params, showTable, message) => {
    connection.query(
        queryFn,
        params,
        function (err, results) {
            if (err) throw err;
            if (showTable) {
                console.table(results);
            }
            else {
                console.log(message);
            }
            return promptOptions();
        });
};

// update roles
const promptRoleOptions = () => {
    connection.query(
        viewTable('departments'),
        function (err, results) {
            if (err) throw err;
            // get array of departments
            const deptOptions = results.map(({ name }) => name);
            //get array of department ids
            const deptIds = results.map(({ id }) => id);
            inquirer.prompt([{
                type: 'list',
                name: 'chooseUpdateTask',
                message: 'What would you like to do?',
                choices: ['Add Role', 'Remove Role', 'Go Back']
            }])
                .then(({ chooseUpdateTask }) => {
                    switch (chooseUpdateTask) {
                        case 'Add Role':
                            return inquirer
                                .prompt([{
                                    type: 'list',
                                    name: 'dept',
                                    message: 'Select a department',
                                    choices: deptOptions
                                },
                                {
                                    type: 'text',
                                    name: 'roleInput',
                                    message: 'Please enter the name of the new role.'
                                },
                                {
                                    type: 'text',
                                    name: 'salaryInput',
                                    message: 'Please enter a salary'
                                }])
                                .then(({ dept, roleInput, salaryInput }) => {
                                    // get corresponding dept id
                                    const deptIdIndex = deptOptions.indexOf(dept);
                                    const deptId = deptIds[deptIdIndex];
                                    
                                    // insert new role
                                    connectDb(addRole(), 
                                    [roleInput, parseFloat(salaryInput), deptId], 
                                    false, 
                                    `\mSuccessfully added role ✶ ${roleInput} ✶\n`);
                                });
                        case 'Remove Department':
                            console.log('removing department ...');
                            promptOptions();
                            break;
                        case 'Go Back':
                            promptOptions();
                            break;
                    }
                });
        });
};

// update departments
const promptDeptOptions = () => {
    return inquirer
        .prompt([{
            type: 'list',
            name: 'chooseUpdateTask',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Remove Department', 'Go Back']
        }])
        .then(({ chooseUpdateTask }) => {
            switch (chooseUpdateTask) {
                case 'Add Department':
                    return inquirer
                    .prompt([{
                        type: 'text',
                        name: 'deptInput',
                        message: 'Please enter the name of the new department.'
                    }])
                    .then(({ deptInput }) => {
                        connectDb(addDepartment(), deptInput, false, `\nSuccessfully added department ✶ ${deptInput} ✶\n`);
                    });
                case 'Remove Department':
                    console.log('removing department ...');
                    promptOptions();
                    break;
                case 'Go Back':
                    promptOptions();
                    break;
            };
        });
};