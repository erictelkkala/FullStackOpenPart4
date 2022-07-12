const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/userSchema')
const helper = require('../utils/user_helpers')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({
            username: 'root',
            name: 'rootUser',
            passwordHash,
        })

        await user.save()
    })

    test('a list of users is returned', async () => {
        const usersInDb = await helper.usersInDb()
        expect(usersInDb).toHaveLength(1)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('Creation fails if username is taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            password: 'root',
        }
        await api.post('/api/users').send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Creation fails if password is under 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'sa',
        }
        await api.post('/api/users').send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Creation fails if username is under 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'ml',
            name: 'Matti Luukkainen',
            password: 'salasana',
        }
        await api.post('/api/users').send(newUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})
