import Database from 'better-sqlite3'
const db = new Database('news.db')

// TODO: move this stuff out of here
import { MediaBiasFactCheck } from './biasScrapper.mjs'
import { getUrlFromSource } from './biasGetUrlFromSource.js'

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

const sources = db.prepare('SELECT source FROM articles').pluck().all()

const urls = []

for (const source of sources) {
  urls.push(getUrlFromSource(source))
}

const scrapper = new MediaBiasFactCheck()

for (const url of urls) {
  setTimeout(() => {
    console.log('url', url)
    // const data = await scrapper.fetchText(url)
    // scrapper.clean(data)

    // const biasDetails = scrapper.scrapeDetails(data)
  }, 50)
}

// const insert = db.prepare(
//   'INSERT OR IGNORE INTO sources (name, bias_rating, factual_reporting, country, media_type, popularity, mbfc_credibility_rating) VALUES (@name, @bias_rating, @factual_reporting, @country, @media_type, @popularity, @mbfc_credibility_rating)'
// )

// const insertMany = db.transaction((sources) => {
//   for (const source of sources) insert.run(source)
// })

// insertMany(sources)

db.close()
