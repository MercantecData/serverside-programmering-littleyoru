const http = require('http')
const url = require('url')

http.createServer((req, res) => {

    // check cookie
    let cookie = req.headers.cookie
    console.log('cookie from browser ', cookie)

    // set cookie
    res.setHeader('Set-Cookie', 'cookie1=christmas cookie; cookie2=apple pie')
    res.end()

}).listen(8081)

