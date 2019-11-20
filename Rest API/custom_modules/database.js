
exports.dbConnect = (user, password, database, host, server) => {

    const mysql = require('mysql')

    var conn = mysql.createConnection({
        user: user,
        password: password,
        database: database,
        host: host
    })

    conn.connect((err) => {
        if (err) {
            console.log('db error ', err.code)
        } //handlerError(err)
        server(conn)
    })
}