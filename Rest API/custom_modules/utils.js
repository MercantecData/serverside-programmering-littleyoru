const GETROOMS = String.raw`SELECT * FROM Rooms`
const GETUSERS = String.raw`SELECT * FROM Users`
const GETBOOKINGSTODAY = String.raw`SELECT * FROM Bookings WHERE DATE(BookDate) = CURRENT_DATE()`
const GETBOOKINGSCUSTOM = (day) => String.raw`SELECT * FROM Bookings WHERE DAY(BookDate) = ${day}`
const ADDBOOKING = String.raw`INSERT INTO Bookings (BookDate, RoomId, UserId) VALUES (CURRENT_TIMESTAMP, 2, 2)`

// method to return the query to execute for different paths
exports.handleQuery = (method, path, params) => {
    switch (path) {
        case '/rooms':
            return GETROOMS
        case '/users':
            return GETUSERS
        case '/bookings':
            if (Object.keys(params).length > 0) {
                let dayParam = params['day']
                console.log('dayParam ', dayParam)
                return GETBOOKINGSCUSTOM(dayParam)
            }
            return GETBOOKINGSTODAY
        case '/add':
            if (method === 'post')
                return ADDBOOKING
            else return false
        default:
            return false
    }
}


// method to return different error messages depending on error number
exports.handleError = (err, res = null) => {
    console.log('error in handleError ', err)
    let errInfo = {
        nr: err.errno,
        msg: err.code
    }
    switch (errInfo.nr) {
        case 400:
            errInfo,msg = 'Bad request!'
            break
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
    if (res !== null) {
        console.log(JSON.stringify(errInfo.msg))
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = err.errno
        res.statusMessage = JSON.stringify(errInfo.msg)
        res.end()
    }
}

exports.getData = (data) => {
    return data
}


// return results of a query
exports.queryResult = async (query, con) => {
    console.log('query ', JSON.stringify(query))
    //let newQuery = JSON.stringify(query)

    return new Promise((getData, handleError) => {
        con.query(query, (err, data) => {
            if (err) {
                console.log('err in callback ', err)
                handleError(err)
            } else {
                console.log('return data ', JSON.stringify(data))
                getData(data)
            }
        })
    }).catch(error => console.log('error in catch ', error))

    // const dbQuery = (q) => new Promise((resolve, reject) => con.query(q, resolve))

    // dbQuery(newQuery).then(callback).catch((error) => console.log('error ', error))

}

