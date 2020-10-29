const mysql = require('mysql');
const inquier = require('inquirer');
const connection = require('./dbConfig');

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected via ${connection.threadId}')
    startApp();
});

function startApp() {
    inquier
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
            }
            else if (answer.initialChoice === "End session") {
                console.log("Session complete. Thanks for using the Emplyeement System!")
                connection.end();
            }
            else if (answer.initialChoice === "View employees, roles or departments") {
                viewOption();
            };

        });
};

function addOption() {
    inquier
        .prompt([
            {
                type: "list",
                message: "Would you like to add a new employee, role or department?",
                choices: ["New Employee", "New Role", "New Department"],
                name: "addedOption"
            }
        ]).then(answer => {
            if (answer.addedOption === "New Employee") {
                addEmployee();
            } else if (answer.initialChoice === "New Role") {
                addRole();
            } else if (answer.initialChoice === "New Department") {
                newDepartment();
            }
        })
};


function viewOption() {
    inquier
        .prompt([
            {
                type: "list",
                message: " What data would you like to review?",
                choices: ["Employee Data", "Role Data", "Department Data"],
                name: "viewChoice"
            }
        ]).then(answer => {
            if (answer.viewChoice === "Employee Data") {
                viewEmployee();
            } else if (answer.viewChoice === "Role Data") {
                viewRole();
            } else if (answer.viewChoice === "Department Data") {
                viewDepartment();
            };
        });
};


// adding role, employee or department

function addEmployee() {
    inquier
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
                message: "What is their role ID?",
                name: "employeeRole"
            },
            {
                type: "input",
                message: "What is their manager's ID?",
                name: "managerId"
            }
        ]).then(answer => {
            const { firstName, lastName, employeeId, employeeRole, managerId } = answer;

            connection.query(
                "INSERT INTO Employee SET?", {
                first_name: answer.firstName,
                last_name: answer.lastName,
                id: answer.employeeId,
                role_id: answer.employeeRole,
                manager_id: answer.managerId

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
    inquier
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
    inquier
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

//viewing employee, role and department function 

function viewEmployee() {
    //function to view employees
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        console.table(results);
    });
    viewRestart();
};

function viewRole() {
    //function to view roles
    connection.query(
        "SELECT * FROM role",
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
    )
    viewRestart();

};

function viewDepartment() {
    //function to view department
    connection.query(
        "SELECT * FROM department",
        function (err, results) {
            if (err) throw err;
            console.table(results);
        }
    )
    viewRestart();

};

function addRestart() {
    inquier
        .prompt([
            {
                type: "list",
                message: "Would you like to add more information or return to the main menu?",
                choices: ["Keep adding info", "Return to Main Menu"],
                name: "addRestartOption"
            }
        ]).then(answer => {
            if (answer.addRestartOption === "Keep adding info") {
                addOption();
            } else {
                startApp()
            };
        });
};

function viewRestart() {
    inquier
        .prompt([
            {
                type: "list",
                message: "Would you like to view more information or return to the main menu?",
                choices: ["Keep viewing info", "Return to Main Menu"],
                name: "viewRestartOption"
            }
        ]).then(answer => {
            if (answer.viewRestartOption === "Keep viewing info") {
                viewOption();
            } else {
                startApp()
            };
        });
};

function endApp() {
    console.log("Thanks for using The Employee Tracking System!");
    connection.end();
};