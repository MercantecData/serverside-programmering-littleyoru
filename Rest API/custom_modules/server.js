const utils = require('./utils')

exports.initServer = (port, con) => {

    var http = require('http')
    var url = require('url')

    http.createServer(async (req, res) => {
        var parsedUrl = url.parse(req.url, true)
        let pathName = parsedUrl.pathname

        console.log('url ', parsedUrl)
        console.log('pathName ', pathName)
        console.log('method ', req.method)

        // check if post request
        if (req.method === 'POST') {
            let found = utils.handleQuery('post', pathName)
            if (!found) {
                res.statusCode = 404
                res.statusMessage = 'Page not found'
                res.write('Page not found')
                res.end()
            } else {
                res.setHeader('Content-Type', 'text/plain')
                await utils.queryResult(found, con)
                res.end('Post request successful')
            }

        } // else
        else {
            let params = parsedUrl.query
            console.log('params ', JSON.stringify(params))

            let found = utils.handleQuery('get', pathName, params)

            // cookies
            // res.setHeader('Set-Cookie', 'foo=bar')

            console.log('found ', found)
            if (!found) {
                res.statusCode = 404
                res.statusMessage = 'Page not found'
                res.write('Page not found')
                res.end()
                
            } else {
                res.setHeader('Content-Type', 'text/json')
                res.end(JSON.stringify(await utils.queryResult(found, con)))

            }
        }

        
        
    }).listen(port)
}

