const inquirer = require('inquirer');
const mysql = require('mysql2');
//Import and require mysql2

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the database.`)
);

connection.connect ((err) => {
    if (err) throw err;
    console.log('You have successfully connected!');
});

//Function to start the app
function strTracker() {
    inquirer
     .prompt ({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employess',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]

     })
     .then ((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                break;
            case 'Add a role':
                break;
            case 'Add an employee':
                break;
            case 'Update an employee role':
                break;
            case 'Exit':
                break;
            
        }
     });
}

//Function to view all departments
function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        strTracker();
    });
}

//Function to view all roles
function viewAllRoles() {
    connection.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        strTracker();
    });
}

//Function to view all employees
function viewAllEmployees() {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager ' +
    'FROM employee ' +
    'INNER JOIN role ON employee.role_id = role.id ' +
    'INNER JOIN department ON role.department_id = department.id ' +
    'LEFT JOIN employee manager ON manager.id = employee.manager_id';

 connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    strTracker();
 });
}