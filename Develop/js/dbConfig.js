const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "Love.0980",
    database: 'tracker_db'
});

module.exports = connection; 