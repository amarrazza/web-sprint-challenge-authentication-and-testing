// Write your tests here
const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')
// const Users = require('./users/users-model')
// const router = require('./auth/auth-router')


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})



describe('test endpoints', () => {


//   test('users can get inserted', async () => {
//     let result = await Users.add({ username: 'ludvig', password: '1234' })
//     expect(result).toEqual({ username: 'ludvig', password: '1234', id: 1 })
//     let users = await db('users')
//     expect(users).toHaveLength(1)
// })

  test('call the up endpoint', async () => {
    const result = await request(server).get('/')
    expect(result.status).toBe(200)
  })

  test('[POST] /register', async () => {
    let result = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'dave',
        password: '1234'
      })
    expect(result.status).toBe(201)
  })

})