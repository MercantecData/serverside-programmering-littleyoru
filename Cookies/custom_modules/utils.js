
exports.makeCookiesObject = (cookies) => {
    let cookieList = {}
    cookies.split(';').forEach((c) => {
        let halfCookie = c.split('=')
        cookieList[halfCookie[0].trim()] = halfCookie[1].trim()
    })
    return cookieList
}