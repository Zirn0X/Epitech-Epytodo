const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

connection.connect(function(err) {
    if (err)
        console.error('Connection Failed to database: ' + err.stack);
    else
        console.log('Connected to database');
});

module.exports = connection