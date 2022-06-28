import supertest from 'supertest'
import assert from 'assert'
// import scrapeIt from 'scrape-it'
import cheerio from 'cheerio'

import { app } from './utils/server/server.mjs'

import memeorandum from '../src/scraperConfig/memeorandum.mjs'

xit('starts test server', async () => {
  const response = await supertest(app).get('/')
  assert.equal(response.statusCode, 200)
})

xit('test server returns mock memeoranum html page', async () => {
  const response = await supertest(app).get('/')
  const $ = cheerio.load(response.text);
  // const blah = await scrapeIt('http://localhost:3000', memeorandum)
  // console.log('blah', blah)
  // assert.equal(response.text, 'HelloWorld!');
})

xit('test server returns mock memeoranum html page', async () => {
  const response = scrapeIt('http://127.0.0.1:3001', memeorandum)
  console.log('resp', response)
  // assert.equal(response.statusCode, 200)
})

// it starts test server
// it has test server return mock memeorandum html page
// it scrapes and returns articles
// obj - develop scraping logic without http requests
