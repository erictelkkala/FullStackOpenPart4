const Blog = require('../models/blogSchema')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }
})
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    // If the likes property is not defined, set it to 0
    if (blog.likes === undefined) {
        blog.likes = 0
        // If the name and url properties are not defined, return a 400 error
    } else if (blog.name === undefined || blog.url === undefined) {
        response.status(400).end()
    }

    const result = await blog.save()
    if (result) {
        response.status(201).json(result)
    } else {
        response.status(400).end()
    }
})

module.exports = blogRouter
