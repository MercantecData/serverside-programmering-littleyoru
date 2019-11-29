const http = require('http')
const url = require('url')
const utils = require('./custom_modules/utils')

http.createServer((req, res) => {

    // check cookie
    let cookie = req.headers.cookie
    console.log('cookie from browser ', cookie)
    let cookieList = utils.makeCookiesObject(cookie)
    console.log(cookieList)

    // set cookie
    let cookies = [
        'cookie1=christmas cookie',
        'cookie2=cheese pie',
        'cookie3=chocolate cookie'
    ]
    res.setHeader('Set-Cookie', cookies)
    res.end()

}).listen(8081)

