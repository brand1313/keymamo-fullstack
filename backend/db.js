const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST, //RDS 의 entrypoint
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

exports.pool = pool;