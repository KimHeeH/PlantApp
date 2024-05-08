const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user : 'plant',
    password: 'plt1234',
    database: 'plantdb',
    dateStrings: 'date' 
});

db.connect();

module.exports = db;
  