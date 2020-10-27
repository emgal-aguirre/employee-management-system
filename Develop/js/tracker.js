const mysql = require('mysql');
const inquierer = require('inquirer');
const connection = require('./dbConfig');

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected via ${connection.threadId}')
    startApp();
});

function startApp() {
    inquierer
        .prompt([
            {
                type: "list",
                message: " Welcome to the Employee Management System. How can I help you today?",
                choices: ["Add emplyee, role, or department", "View employees, roles or departments", "End session"],
                name: "initialChoice"
            }
        ]).then(answer => {
            if (answer.initialChoice === "Add emplyee, role, or department") {
                addOption();
            } else if (answer.initialChoice === "View emplyee, role, or department") {
                viewOption();
            } else if (answer.initialChoice === "End session") {
                console.log("Session complete. Thanks for using the Emplyeement System!")
                connection.end();
            };
        });
};

function addOption() {
    inquierer
        .prompt([
            {
                type: "list",
                message: "Would you like to add a new employee, role or department?",
                choices: ["New Employee", "New Role", "New Department"],
                name: "addedOption"
            }
        ]).then(answer => {
            if (answer.addedOption === "New Employee") {
                newEmployee();
            } else if (answer.initialChoice === "New Role") {
                newRole();
            } else if (answer.initialChoice === "New Department") {
                newDepartment();
            }
        })
};

function viewOption() {
    inquierer
        .prompt([
            {
                type: "list",
                message: "Would you like to view employee, role or depepartment directory?",
                choices: ["Employee", "Role", "Department"],
                name: "viewChoice"
            }
        ]).then(answer => {
            if (answer.viewChoice === "Employee") {
                viewEmployee();
            } else if (answer.viewChoice === "Role") {
                viewRole();
            } else if (answer.viewChoice === "Department") {
                viewDepartment();
            }
        })
};