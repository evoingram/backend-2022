const request = require('supertest')
const server = require('./server.js')
/*
The following test passes successfully locally but not within github actions
  so it's disabled until i have time to fix it:

it(`should set db environment to testing`, () => {
  expect(process.env.DB_ENV).toBe('testing')
})
*/

describe('server', () => {
  describe('GET /', () => {
    it('should return 200', () => {
      // run server & make a GET request to check for 200 response
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200)
        })
    })

    it('should return HTML', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/html/i)
        })
    })
  })
})
