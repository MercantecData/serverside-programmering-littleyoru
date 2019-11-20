let handleQuery = (path) => {
    switch (path) {
        case 
    }
} 

exports.initServer = (port) => {

    var http = require('http')
    var url = require('url')

    http.createServer((req, res) => {
        var parsedUrl = url.parse(req.url, true)
        let pathName = parsedUrl.pathName

        console.log('url ', parsedUrl)
        console.log('pathName ', pathName)

        let found = false

        // cookies
        // res.setHeader('Set-Cookie', 'foo=bar')

        handleQuery(pathName)

        if (!found) {
            res.writeHead(404, 'Page not found', {'Content-Type': 'text/plain'})
            res.end()
        }
    }).listen(port)
}

