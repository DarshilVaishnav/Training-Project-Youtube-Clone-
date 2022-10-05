const mysql = require('mysql2');
require('dotenv').config()
// MySQL details
// var mysqlConnection = mysql.createConnection({
//     host: process.env.DBHOST,//43.204.134.14
//     port : process.env.DBPORT,
//     user: process.env.DBUSER,//youtube
//     password: process.env.DBPASSWORD,//Tl3KNOjZpUuPaRQ
//     database: process.env.DBDATABASE,//youtube
//     multipleStatements: true,
// });
var mysqlConnection = mysql.createConnection({
    host: 'localhost',//43.204.134.14
    port : 3306,
    user: 'root',//youtube
    password: 'Radixweb@8',//Tl3KNOjZpUuPaRQ
    database: 'youtube',//youtube
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

module.exports = mysqlConnection;