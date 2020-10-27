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

// adding role, employee or department

function addEmployee() {
    inquierer
        .prompt([
            {
                type: "input",
                message: "What is the new employees first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the new employees last name?",
                name: "lastName"
            },
            {
                type: "input",
                message: "What is the the employees ID number",
                name: "employeeId"
            },
            {
                type: "input",
                message: "What is their role?",
                name: "employeeRole"
            }
        ]).then(answer => {
            const { firstName, lastName, employeeId, employeeRole } = answer;

            connection.query(
                "INSERT INTO Employee SET?", {
                first_name: answer.firstName,
                last_name: answer.lastName,
                id: answer.employeeId,
                role_id: answer.employeeRole
            }, function (err, results) {
                if (err) throw err;
                console.table(results);
                console.log("The new employee has been succesfully added!")
            }
            )
            addRestart();
        })
};

function addRole() {
    inquierer
        .prompt([
            {
                type: "input",
                message: "What is the role being added?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the id for the new role?",
                name: "roleId"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "What department does this role belong to?",
                name: "roleDepartment"
            }
        ]).then(answer => {
            const { roleName, roleId, roleSalary, roleDepartment } = answer;

            connection.query(
                "INSERT INTO Role SET?", {
                title: answer.roleName,
                id: answer.roleId,
                salary: answer.roleSalary,
                department_id: answer.roleDepartment
            }, function (err, results) {
                if (err) throw err;
                console.table(results);
                console.log("The new role has been succesfully added!")
            }
            )
            addRestart();
        })
};

function addDepartment() {
    inquierer
        .prompt([
            {
                type: "input",
                message: "What is the department being added?",
                name: "departmentName"
            },
            {
                type: "input",
                message: "What is the id for the new department?",
                name: "departmentId"
            }
        ]).then(answer => {
            const { departmentName, departmentId } = answer;

            connection.query(
                "INSERT INTO Role SET?", {
                name: answer.departmentName,
                id: answer.departmentId,
            }, function (err, results) {
                if (err) throw err;
                console.table(results);
                console.log("The new role has been succesfully added!")
            }
            )
            addRestart();
        })
};