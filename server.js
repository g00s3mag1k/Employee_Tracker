const inquirer = require("inquirer");
const mysql = require("mysql2");
//Import and require mysql2
const consTable = require("console.table");


//Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'bootcamp',
        database: 'employee_db'
    });

    strTracker();

//Function to start the app
async function strTracker() {
    const { action } = await inquirer.prompt ([{
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ],
    }]);

    switch (action) {
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
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee(); // Fixed: added the missing function call
            break;
        case 'Update an employee role':
            updateEmployeeRole(); // Fixed: added the missing function call
            break;
        case 'Exit':
            db.end();
            break;
    }

    await strTracker(); // Fixed: added the missing await statement
}

strTracker();

//Function to view all departments
async function viewAllDepartments() {
    try {
        const results = db.query('SELECT * FROM department');
        console.table(results.rows);
    } catch (err) {
        console.error(err);
    }
}

//Function to view all roles
async function viewAllRoles() {
    try {
        const results = db.query(`SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role INNER JOIN department ON department.id = role.department_id`);
        console.table(results);
    } catch (err) {
        console.error(err);
  }
}

//Function to view all employees
async function viewAllEmployees() {
    try {
        const results = db.query(`
            SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.name AS department,
                role.salary,
                CONCAT(manager.first_name, " ", manager.last_name) AS manager
            FROM
                employee
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id
        `);
        console.table(results);
    } catch (err) {
        console.error(err);
    }
}

//Function to add a department
async function addDepartment() {
    const { name } = await inquirer.prompt([
        {
            name: "name",
            type: 'input',
            message: 'Enter the name of the department:'
        },
    ]);
    try {
        db.query(
            ` INSERT INTO department (name)
            VALUES (?)`,
            [name] // Fixed: Pass the parameter as an array
        );
        console.log(`Added ${name} to the database`);
    } catch (err) {
        console.error(err);
    }
}

async function addRole() {
    const departments = db.query('SELECT * FROM department');
    const { title, salary, department_id } = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the name of the role:'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:'
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Select the department for the role:',
            choices: departments.map(department => department.department_id)
        }
    ]);
    try {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
        console.log(`Role ${title} added successfully!`);
    } catch (err) {
        console.error(err);
    }
}

//Function to add an employee