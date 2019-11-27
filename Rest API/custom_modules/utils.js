const GETROOMS = String.raw`SELECT * FROM Rooms`
const GETUSERS = String.raw`SELECT * FROM Users`
const GETBOOKINGSTODAY = String.raw`SELECT * FROM Bookings WHERE DATE(BookDate) = CURDATE()`
let day = 14
const GETBOOKINGSCUSTOM = String.raw`SELECT * FROM Bookings WHERE DAY(BookDate) = ${day}`
const ADDBOOKING = String.raw``

exports.handleQuery = (path, param) => {
    switch (path) {
        case '/rooms':
            return GETROOMS
        case '/users':
            return GETUSERS
        case '/bookings':
            return GETBOOKINGSTODAY
        default:
            return false
    }

} 

// method to return different error messages depending on error number
exports.handleError = (err, res) => {
    let errInfo = {
        nr: err.errno,
        msg: err.code
    }
    switch (errInfo.nr) {
        case 404:
            errInfo.msg = 'Page not found! Check url.'
            break
        case 1045:
            errInfo.msg = 'Connection denied. Incorrect username or password.'
            break
        case 1049:
            errInfo.msg = 'Database does not exist!'
            break
        case 1146:
            errInfo.msg = 'Specified table does not exist.'
            break
        case 1149:
            errInfo.msg = 'There is an error in the sql query syntax.'
            break
        default:
            errInfo.msg = 'Unkown error.'
            break
    }
    if (res) {
        res.writeHead(404, JSON.stringify(errInfo.msg), {'Content-Type': 'text/plain'})
        res.end()
        console.log(JSON.stringify(errInfo.msg))
    }
}


exports.geDataOrError = (data, err) => {
    if (err)  this.handleError(err)
    console.log('data ', JSON.stringify(data))
    return JSON.stringify(data)
}

exports.getData = (data) => {
    return JSON.stringify(data)
}



// return results of a query
exports.queryResult = (query, con) => {
    console.log('query ', JSON.stringify(query))
    let newQuery = JSON.stringify(query)

    let callback = (err, data) => {
        if (err) {
            console.log('err in callback ', err)
            this.handleError(err)
        } else {
            console.log('return data')
            return data
        }

    }
    // con.query(param, (err, data) => {
    //     if (err)
    //         this.handleError(err)
    //     else
    //         return data
    // })
    const dbQuery = (q) => new Promise(resolve => con.query(q, resolve))

    dbQuery(newQuery).then(callback).catch((error) => console.log('error ', error))

    // con.query(query).then(result => {
    //     console.log('await result ', result)
    // })

}

