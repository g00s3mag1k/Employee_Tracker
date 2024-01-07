const { prompt } = require("inquirer");
const mysql = require("mysql2");
//Import and require mysql2
const util = require("util");
//const util = require("util");
//const consTable = require("console.table");
const PORT = process.env.PORT || 3006

function init() {
    const '' = logo({ name: "Employee Manager"}).render();
    console.log('');
    strTracker();
};


//Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'bootcamp',
        database: 'employee_db'
    });
    db.query = util.promisify(db.query);


 
//Function to start the app
async function strTracker() {
    const { action } = await inquirer.prompt ([{
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
                break;
            case 'Update an employee role':
                break;
            case 'Exit':
                db.end();
                break;
        }
        strTracker();
}

//Function to view all departments
async function viewAllDepartments() {
    try {
    const results = await db.query('SELECT * FROM department');
        console.table(results);
    } catch (err) {
        console.error(err);
    }
}

//Function to view all roles
async function viewAllRoles() {
    try {
        const results = await db.query(`SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role INNER JOIN department ON department_id = role.department.id`);
        console.table(results);
    } catch (err) {
        console.error(err);
  }
}

//Function to view all employees
async function viewAllEmployees() {
    try {
    const results = await db.query (`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager ' +
    'FROM employee ' +
    'INNER JOIN role ON employee.role_id = role.id ' +
    'INNER JOIN department ON role.department_id = department.id ' +
    'LEFT JOIN employee manager ON manager.id = employee.manager_id`);
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
        await db.query (
            ` INSERT INTO department (name)
            VALUES (?)`,
            name
        );
        console.log(`Added`)
    }
}

function addRole() {
    const departments = [];
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        res.forEach((department) => {
            departments.push({
                name: department.name,
                value: department.id
            });
        });
        inquirer
         .prompt ([
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
                name: 'department',
                type: 'list',
                message: 'Select the department for the role:',
                choices: departments
            }
         ])
         .then ((answers) => {
            db.query('INSERT INTO role SET ?', {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department
            }, (err, res) => {
                if (err) throw err;
                console.log(`Role ${answers.title} added successfully!`);
                strTracker();
            });
         });
    });
}

//Function to add an employee