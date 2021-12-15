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

const insertMany = db.transaction((scrappedData) => {
  console.log('saving...', scrappedData)
  for (const details of scrappedData) insert.run(details)
  console.log('saving done')
})

let scrappedData = []

console.log(`setting up scrapper...`)

const scrapper = new MediaBiasFactCheck()

async function doScrapping(scrapper, place) {
  const { name, url } = place

  console.log(`scrapping ${name}...`)
  try {
    const data = await scrapper.fetchText(url)

    scrapper.clean(data)
    const details = await scrapper.scrapeHTML(data, name)
    console.log(details)
    scrappedData.push(details)
  } catch (err) {
    throw err
  }
}

const run = async () => {
  for (const place of placesToScrape) {
    try {
      if (!biasSourceNames.includes(place.name)) {
        doScrapping(scrapper, place)
        await sleep(1000)
      } else {
        console.log(`Skipping ${place.name}, already included`)
      }
    } catch ({ errorMessage, cause }) {
      console.log(err) // Continue map loop on exception
      console.log('Cause: ' + cause)
    }
  }
}

run()
  .then(() => {
    console.log('scrapping done')

    insertMany(scrappedData)

    console.log('db closed')
  })
  .finally(() => db.close())
