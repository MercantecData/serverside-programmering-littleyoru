const http = require('http')
const url = require('url')

http.createServer((req, res) => {

    // check cookie
    let cookie = req.headers.cookie
    console.log('cookie from browser ', cookie)

    // set cookie
    let cookies = [
        'cookie1=christmas cookie',
        'cookie2=apple pie'
    ]
    res.setHeader('Set-Cookie', cookies)
    res.end()

}).listen(8081)

