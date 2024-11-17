const mysql = require('mysql')

const configMySQL = {
    connectionLimit: 100,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}

const pool = mysql.createPool(configMySQL)

pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'PROTOCOL_CONNECTION_LOST':
                console.log('Se cerró la conexión con la db')
                break;
            case 'ER_CONN_COUNT_ERROR':
                console.log('La base de datos llegó al límite de conexiones')
                break;
            case 'ECONNREFUSED':
                console.log('La conexión fue rechazada')
        }
    }
    if (connection) {
        console.log(connection)
        connection.release()
    }
})

module.exports = pool