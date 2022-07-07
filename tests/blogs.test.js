const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogSchema')

const initialBlogs = [
    {
        title: 'String',
        author: 'Author',
        url: 'www.String.com',
        likes: 12345,
    },
    {
        title: 'String2',
        author: 'Author2',
        url: 'www.String2.com',
        likes: 1234,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('blogs', () => {
    test('Blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('The ID field exists and is named _id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0]._id).toBeDefined()
    })

    test('A new blog can be added to the database', async () => {
        const newBlog = {
            title: 'String3',
            author: 'Author3',
            url: 'www.String3.com',
            likes: 123,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const lastBlog = response.body[response.body.length - 1]
        // Remove the properties that we cannot test
        delete lastBlog._id && delete lastBlog.__v
        expect(lastBlog).toEqual(newBlog)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})
