DROP DATABASE IF exists employeetracking_db;

CREATE DATABASE employeetracking_db;

USE employeetracking_db;

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL, 
    manager_id INT(5),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL, 
    title VARCHAR(100) NOT NULL, 
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    PRIMARY KEY (id)
);
