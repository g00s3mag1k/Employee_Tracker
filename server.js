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
                break;
            case 'View all roles':
                break;
            case 'View all employees':
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