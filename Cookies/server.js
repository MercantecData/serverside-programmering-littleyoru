const http = require('http')
const url = require('url')
const utils = require('./custom_modules/utils')

http.createServer((req, res) => {

    // event listener for errors on request
    req.on('error', (err) => console.log('error in request ', err))

    // event listener for errors on response
    res.on('error', (err) => console.log('error in response stream ', err))

    // check cookie
    let cookie = req.headers.cookie
    console.log('cookie from browser ', cookie)
    if (cookie) {
        let cookieList = utils.makeCookiesObject(cookie)
        console.log(cookieList)
    } else {
        console.log('no cookies')
    }


    // set cookie
    let cookies = [
        'cookie1=christmas cookie; Max-Age=30',
        'cookie2=cheese pie; Max-Age=10',
        'cookie3=chocolate cookie; Max-Age=20'
    ]
    res.setHeader('Set-Cookie', cookies)
    res.end()

}).listen(8081)

