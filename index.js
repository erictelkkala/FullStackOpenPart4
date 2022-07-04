const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogRouter')
app.use('/api/blogs', blogRouter)

const mongoUrl = config.MONGO_URI
mongoose
    .connect(mongoUrl)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

const server = http.createServer(app)
const PORT = config.PORT
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})
