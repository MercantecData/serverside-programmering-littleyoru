const url = require('url') // url resolution and parsing
const http = require('http')
const fs = require('fs') // file system
const path = require('path') // file and directory paths

const webserver = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url)
    let pathName = parsedUrl.pathname
    let ext = path.extname(pathName)

    console.log('requrl: ', parsedUrl)

    // if request is for root directory return index.html
    // otherwise append '.html' to all other requests without ext
    if (pathName === '/') {
        ext = '.html'
        pathName = 'index.html'
    } else if (!ext) {
        ext = '.html'
        pathName += ext
    }

    // construct a path for assets
    const filePath = path.join(process.cwd(), '/Website', pathName)

    // check if asset exists on the server
    fs.exists(filePath, (exists, err) => {
        if (!exists) {
            res.end()
        }
    })

    res.end(JSON.stringify(parsedUrl))
})

webserver.listen(8081)