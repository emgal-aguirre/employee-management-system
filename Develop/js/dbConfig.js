const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'employeetracking_db'
});

module.exports = connection; 
