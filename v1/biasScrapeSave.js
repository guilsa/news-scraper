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

const sources = db.prepare('SELECT source FROM articles LIMIT 1').pluck().all()

const uniqueUrls = new Set()
const urls = []
for (const source of sources) uniqueUrls.add(getUrlFromSource(source))
for (let url of uniqueUrls) urls.push(url)

const scrapper = new MediaBiasFactCheck()

const insert = db.prepare(
  'INSERT OR IGNORE INTO sources (name, bias_rating, factual_reporting, country, media_type, popularity, mbfc_credibility_rating) VALUES (@name, @bias_rating, @factual_reporting, @country, @media_type, @popularity, @mbfc_credibility_rating)'
)

const insertBiasDetails = db.transaction((biasDetails) => {
  for (const details of biasDetails) insert.run(details)
})

async function doWork(scrapper, url) {
  const data = await scrapper.fetchText(url)

  scrapper.clean(data)
  const biasDetails = await scrapper.scrapeDetails(data)

  console.log(`Saving url: ${url}`)
  console.log(biasDetails)
  console.log('')
  insertBiasDetails(biasDetails)
}

for (const url of uniqueUrls) {
  doWork(scrapper, url)
  await sleep(1000)
}

db.close()
