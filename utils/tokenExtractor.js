const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // Send the token as a header named token
        request.token = authorization.substring(7)
        next()
    } else {
        response.status(401).json({ error: 'token missing or invalid' }).end()
    }
}
module.exports = tokenExtractor
