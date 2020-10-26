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
                choices: ["Add emplyee, role, or department", "View employees, roles or departments", "Update employee roles", "End session"],
                name: "initialChoice"
            }
        ]).then(answer => {
            if (answer.initialChoice === "Add emplyee, role, or department") {
                addOption();
            } else if (answer.initialChoice === "View emplyee, role, or department") {
                viewOption();
            } else if (answer.initialChoice === "Update employee roles") {
                updateEmployee();
            } else if (answer.initialChoice === "End session") {
                console.log("Session complete. Thanks for using the Emplyeement System!")
                connection.end();
            };
        });
};