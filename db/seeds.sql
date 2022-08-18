INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, department_id, salary)
VALUES
('Sales Lead', 1, 100000 ),
('Salesperson', 1, 85000),
('Lead Engineer', 2, 150000),
('Software Engineer', 2, 120000),
('Account Manager', 3, 160000),
('Accountant', 3, 125000),
('Legal Team Lead', 4, 250000),
('Lawyer', 4, 190000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Wick', 1, NULL),
('Bill', 'Johnson', 2, 1),
('Jill', 'Smith', 2, 1),
('Ida', 'Brown', 2, 1),
('Norris', 'Filmore', 3, NULL),
('Emily', 'Swanson', 4 , 3),
('Peter', 'Duvert', 4, 3),
('Samuel', 'Jackson', 4, 3),
('Emil', 'Zola', 5, NULL),
('Sandy', 'Capet', 6, 5),
('Tea', 'Akins', 6, 5),
('Qais', 'Al-Sabahi', 6, 5),
('Jack', 'Daehn', 7, NULL),
('Daniela', 'Diaz', 8, 7),
('Erin', 'Graham', 8, 7),
('Elijah', 'Kimaru', 8, 7);
