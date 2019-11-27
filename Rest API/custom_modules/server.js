const utils = require('./utils')

exports.initServer = (port, con) => {

    var http = require('http')
    var url = require('url')

    http.createServer(async (req, res) => {
        var parsedUrl = url.parse(req.url, true)
        let pathName = parsedUrl.pathname
        let params = parsedUrl.query

        console.log('params ', JSON.stringify(params))
        console.log('url ', parsedUrl)
        console.log('pathName ', pathName)

        let found = utils.handleQuery(pathName, params)

        // cookies
        // res.setHeader('Set-Cookie', 'foo=bar')

        console.log('found ', found)
        if (!found) {
            res.statusCode = 404
            res.statusMessage = 'Page not found'
            res.write('Page not found')
        } else {
            res.setHeader('Content-Type', 'text/json')
            res.end(JSON.stringify(await utils.queryResult(found, con)))

            // utils.queryResult(found, con).then(result => {
            //     console.log('test result ', result)
            //     res.write(result)
            //     res.end()}, 
            // err => {
            //     console.log('error in promise - ', err)
            //     res.end()})
        }
        
    }).listen(port)
}

