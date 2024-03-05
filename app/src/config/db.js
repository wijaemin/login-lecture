const mysql = require("mysql");

const db = mysql.createConnection({
    host : "wjm.cj20soia06fo.ap-northeast-2.rds.amazonaws.com",
    user : "admin",
    password : "jm720613!!",
    database : "wjm"
});

db.connect();


module.exports =db;