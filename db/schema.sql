-- Drops table each time it is called to create 
-- a new table
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee; 

-- creates a new department table
CREATE TABLE department (
    -- assigns individual ids to the departments
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    -- holds department name
    name VARCHAR(30) NOT NULL 
);

CREATE TABLE roles (
    -- assigns individual ids to the roles
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    -- holds the role title name
    title VARCHAR(30) NOT NULL, 
    -- refernces the department id
   department_id INTEGER,
    -- Shows the salary of the role
    salary DECIMAL
);

CREATE TABLE employee (
    -- assigns individual ids to the employee
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    -- references the employees role
    role_id INTEGER,
    -- refernces the managers id if there is one
   manager_id INTEGER
);