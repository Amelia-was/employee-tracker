// view tables
const viewTable = (table) => `SELECT * FROM ${table};`;

const viewTables = (table1, table2) => `SELECT * FROM ${table1}
SELECT * FROM ${table2};`

const viewManagers = () => `SELECT employees.id AS "employee_id", CONCAT(employees.first_name, " ", employees.last_name) AS "manager" 
FROM employees WHERE manager_id IS NULL`
// RIGHT JOIN roles
// ON employees.role_id = roles.id;
// LEFT JOIN employees manager
// ON manager.id = employees.manager_id;

const viewRoles = () => `SELECT roles.id, title, departments.name AS "department", salary
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id;`

const viewEmployees = () => `SELECT employees.id, employees.first_name, employees.last_name, title, departments.name AS "department", salary, CONCAT(manager.first_name, " ", manager.last_name) AS "manager"
FROM employees 
LEFT JOIN roles
ON employees.role_id = roles.id
LEFT JOIN departments
ON roles.department_id = departments.id
LEFT JOIN employees manager
ON manager.id = employees.manager_id;`

// add rows
const addDepartment = () => `INSERT INTO departments (name)
VALUES ( ? );`

const addRole = (title, salary, dept) => `INSERT INTO roles (title, salary, department_id)
VALUES ( ?, ?, ? );`

const addEmployee = (firstName, lastName, role, manager) => `INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ( ?, ?, ? );`

module.exports = { 
    viewTable,
    viewTables, 
    viewManagers,
    viewRoles, 
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee };