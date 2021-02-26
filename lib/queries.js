// view tables
const viewTable = (table) => `SELECT * FROM ${table}`;

const viewRoles = () => `SELECT roles.id, title, departments.name AS "department", salary
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id`

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
VALUES (?, ?, ?);`

const addEmployee = (firstName, lastName, role, manager) => `INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES (${firstName}, ${lastName}, ${role}, ${manager});`

// get ids
const getDeptId = (name) => `SELECT id FROM departments WHERE name = "${name}"`

module.exports = { 
    viewTable, 
    viewRoles, 
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    getDeptId };