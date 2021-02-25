INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Junior Engineer', 80000, 2),
('Accountant', 135000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Pam', 'Beesly', 1, null),
('Charles', 'Darcy', 2, 1),
('Eleanor', 'Shellstrop', 2, 1),
('Jake', 'Peralta', 3, null),
('Gina', 'Linetti', 4, 4),
('Nick', 'Carraway', 4, 4),
('Billy', 'Pilgrim', 5, 4),
('Elizabeth', 'Bennet', 6, null),
('Amy', 'Santiago', 7, null),
('Pi', 'Patel', 8, 9);