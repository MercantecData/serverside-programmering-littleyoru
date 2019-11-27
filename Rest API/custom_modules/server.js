const utils = require('./utils')

exports.initServer = (port, con) => {

    var http = require('http')
    var url = require('url')

    http.createServer((req, res) => {
        var parsedUrl = url.parse(req.url, true)
        let pathName = parsedUrl.pathname

        console.log('url ', parsedUrl)
        console.log('pathName ', pathName)

        let found = utils.handleQuery(pathName)

        // cookies
        // res.setHeader('Set-Cookie', 'foo=bar')

        console.log('found ', found)
        if (!found) {
            res.statusCode = 404
            res.statusMessage = 'Page not found'
            res.write('Page not found')
            // utils.handleError(err, res)
        } else {
            res.writeHead(200, 'Success', {'Content-Type': 'textx/plain'})
            res.write(utils.queryResult(found, con))
        }
        
    }).listen(port)
}

