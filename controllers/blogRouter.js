const Blog = require('../models/blogSchema')
const blogRouter = require('express').Router()
const User = require('../models/userSchema')

// Get every blog from the database
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404).end()
    }
})

// Add a new blog to the database
blogRouter.post('/', async (request, response) => {
    const blog = request.body
    console.log(blog.userID)

    const user = await User.findById(blog.userID)
    console.log(user)
    // If the likes property is not defined, set it to 0
    if (blog.likes === undefined) {
        blog.likes = 0
        // If the name and url properties are not defined, return a 400 error
    } else if (blog.title === undefined || blog.url === undefined) {
        response.status(400).end()
    }

    const newBlog = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: user.id,
    })

    const result = await newBlog.save()
    if (result) {
        user.blogs = user.blogs.concat(result.id)
        await user.save()
        response.status(201).json(result)
    } else {
        response.status(400).end()
    }
})

// Delete a blog from the database
blogRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    if (result) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

// Update a blog in the database
blogRouter.put('/:id', async (request, response) => {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body)
    if (result) {
        response.status(200).json(result)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter
