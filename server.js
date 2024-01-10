const mysql = require("mysql2");
const consTable = require("console.table");
var inquirer = require('inquirer');

//Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'bootcamp',
        database: 'employee_db'
    });

//Function to start the app
async function init() {
    const { answers } = await inquirer.prompt ([{
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

    switch (answers) {
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
            
            break;
        case 'Update an employee role':
            
            break;
        case 'Exit':
            db.end();
            break;
    }

    await init(); // Fixed: added the missing await statement
}

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
            SELECT * from employee
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

init();
//Function to add an employee