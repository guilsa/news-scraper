import Database from 'better-sqlite3'

const db = new Database('news.db')

// TODO: move this stuff out of here
import { MediaBiasFactCheck } from './utils/biasScrapper.mjs'
import { sleep } from './utils/util.mjs'

function getUrlFromSource(source) {
  source = source.toLowerCase().split(' ').join('-')
  return `https://mediabiasfactcheck.com/${source}/`
}

class Source {
  create() {
    db.exec(`CREATE TABLE IF NOT EXISTS sources
      (
          id TEXT UNIQUE PRIMARY KEY,
          name TEXT UNIQUE,
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

const publishers = db.prepare('SELECT DISTINCT source FROM articles').pluck().all()

const biasSourceNames = db.prepare('SELECT name FROM sources').pluck().all()

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

console.log(`setting up scrapper...`)

const scrapper = new MediaBiasFactCheck()

let placesScrapedSoFar = 0

await Promise.all(
  placesToScrape.map(async (place) => {
    if (!biasSourceNames.includes(place.name)) {
      console.log('scraping ' + place.name)
      const data = await scrapper.fetchText(place.url)
      scrapper.clean(data)
      const details = await scrapper.scrapeHTML(data, place.name)
      insert.run(details)
      placesScrapedSoFar++
    } else {
      console.log('skipping ' + place.name)
    }
  })
)
  .finally(() => {
    console.log(`completed! scraped ${placesScrapedSoFar} new sources.`);
    db.close()
    console.log('db closed')
  })
  .catch((err) => {
    console.log(err) // Continue map loop on exception
  })
