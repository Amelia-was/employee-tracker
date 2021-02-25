// simple query
const viewTable = (table) => `SELECT * FROM ${table}`;

const viewEmployees = () => `SELECT employees.id, employees.first_name, employees.last_name, title, departments.name AS "department", salary, CONCAT(m.first_name, " ", m.last_name) AS "manager"
FROM employees 
LEFT JOIN roles
ON employees.role_id = roles.id
LEFT JOIN departments
ON roles.department_id = departments.id
LEFT JOIN employees m
ON m.id = employees.manager_id;`

module.exports = { viewTable, viewEmployees };