INSERT INTO department (name)
VALUES     
    (1, 'Sales' ),
    (2, 'Engineering' ),
    (3, 'Finance' ),
    (4, 'Legal' );

INSERT INTO roles (title, salary, department_id)
VALUES 
    (1, 'Sales Lead', 100000, 1 ),
    (2, 'Salesperson', 70000, 1 ),
    (3, 'Lead Engineer', 145000, 2 ),
    (4, 'Software Engineer', 125000, 2 ),
    (5, 'Account Manager', 140000, 3 ),
    (6, 'Accountant', 120000, 3 ),
    (7, 'Legal Team Lead', 230000, 4 ),
    (8, 'Lawyer', 200000, 4 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    (1, 'Joe', 'Schmoe', 1, 1),
    (2, 'John', 'Doe', 2, 2),
    (3, 'Sarah', 'Hill', 3, 3),
    (4, 'Homer', 'Simpson', 4, 1),
    (5, 'Syd', 'Barret', 5, 2),
    (6, 'Angelina', 'Jolie', 6, 3),
    (7, 'Jim', 'Morrison', 7, 2),
    (8, 'Eva', 'Green', 3, 3);