const inquirer = require('inquirer');
const { viewTable } = require('./lib/tables');

const promptOptions = () => {
    return inquirer
    .prompt([{
        type: 'list',
        name: 'chooseTable',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View employees']
    }])
    .then(({ chooseTable }) => {
        if (chooseTable === 'View Departments') {
            console.log('viewing departments ...');
            return viewTable('departments');
        }
        else if (chooseTable === 'View Roles') {
            console.log('viewing roles ...');
            return viewTable('roles');
        }
        else {
            console.log('viewing employees ...');
        }
    });
};

promptOptions();