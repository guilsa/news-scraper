const supertest = require('supertest')
const assert = require('assert')

const app = require('./utils/server/server')

it('starts test server', async () => {
  const response = await supertest(app).get('/')
    assert.equal(response.statusCode, 200)
})

// it starts test server
// it has test server return mock memeorandum html page
// it scrapes and returns articles
// obj - develop scraping logic without http requests
