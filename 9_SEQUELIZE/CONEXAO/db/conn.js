const mysql = require('mysql')
const senhaMySQL = require('../conn')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: senhaMySQL,
    database: 'nodemysql'
})

module.exports = pool