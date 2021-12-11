import Database from 'better-sqlite3'

const db = new Database('news.db')

// TODO: move this stuff out of here
import { MediaBiasFactCheck } from './biasScrapper.mjs'
import { getUrlFromSource } from './biasGetUrlFromSource.js'

import { sleep } from './util.mjs'

class DatabaseModel {}

class Source {
  create() {
    db.exec(`CREATE TABLE IF NOT EXISTS sources
      (
          name TEXT NOT NULL UNIQUE PRIMARY KEY,
          bias_rating TEXT,
          factual_reporting TEXT,
          country TEXT,
          media_type TEXT,
          popularity TEXT,
          mbfc_credibility_rating TEXT
      )`)
  }
}

const source = new Source()
source.create()

const publishers = db.prepare('SELECT DISTINCT source FROM articles LIMIT 2').pluck().all()

// console.log('publishers', publishers)
console.log('----')

const placesToScrape = []

for (const name of publishers) {
  placesToScrape.push({
    name: name,
    url: getUrlFromSource(name),
  })
}

const insert = db.prepare(
  'INSERT OR IGNORE INTO sources (id, name, bias_rating, factual_reporting, country, media_type, popularity, mbfc_credibility_rating) VALUES (@id, @name, @bias_rating, @factual_reporting, @country, @media_type, @popularity, @mbfc_credibility_rating)'
)

const insertMany = db.transaction((scrappedData) => {
  console.log('saving...')
  for (const details of scrappedData) insert.run(details)
  console.log('saving done')
})

let scrappedData = []

console.log(`setting up scrapper...`)

const scrapper = new MediaBiasFactCheck()

async function doScrapping(scrapper, place) {
  const { name, url } = place

  console.log(`scrapping ${name}...`)
  const data = await scrapper.fetchText(url)

  scrapper.clean(data)
  const details = await scrapper.scrapeHTML(data, name)
  // console.log(details)
  scrappedData.push(details)
}

const run = async () => {
  for (const place of placesToScrape) {
    try {
      doScrapping(scrapper, place)
      await sleep(3000)
    } catch (err) {
      console.log(err) // Continue map loop on exception
    }
  }
}

run().then(() => {
  console.log('scrapping done')

  insertMany(scrappedData)

  db.close()
  console.log('db closed')
})
