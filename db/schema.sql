DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;

CREATE TABLE departments (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9, 2) NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
)