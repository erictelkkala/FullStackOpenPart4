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

    afterAll(() => {
        mongoose.connection.close()
    })
})
