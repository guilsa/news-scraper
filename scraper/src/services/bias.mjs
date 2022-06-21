import Database from 'better-sqlite3'

// TODO: move this stuff out of here
import { MediaBiasFactCheck } from './utils/biasScrapper.mjs'
import { sleep } from './utils/util.mjs'
import { readFile } from './readFile.mjs'
import { writeFile } from './writeFile.mjs'

import { getPlacesToScrape } from './utils/getPlacesToScrape.mjs'
import getUrlFromName from './utils/getUrlFromName.mjs'

const config = require('../../config')
const db = new Database(config.databaseStorage)

function invalidResponse(resp) {
  // If there are 5 keys, all empty, it's a bad response
  // bias_rating │ factual_reporting │ country │ popularity │ mbfc_credibility_rating
  return Object.keys(resp).filter((i) => resp[i] === '').length === 5
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
const placesToScrape = getPlacesToScrape(publishers)

const insert = db.prepare(
  'INSERT OR IGNORE INTO sources (id, name, bias_rating, factual_reporting, country, media_type, popularity, mbfc_credibility_rating) VALUES (@id, @name, @bias_rating, @factual_reporting, @country, @media_type, @popularity, @mbfc_credibility_rating)'
)

console.log(`setting up scrapper...`)

const scrapper = new MediaBiasFactCheck()

let successfulScrapes = 0

const biasSourceNames = db.prepare('SELECT name FROM sources').pluck().all()

const fileData = await readFile('./blacklist.txt')
const blacklist = fileData.toString().split('\n')
const newBlacklistQueue = []
const displayScrapedData = []

// TODO - what is skipping and is empty in db? there is an alternative name for these

// TODO: Look into async.parallel()
await Promise.all(
  placesToScrape.map(async (place) => {
    const isBlacklisted = blacklist.includes(place.name)
    if (!biasSourceNames.includes(place.name) && !isBlacklisted) {
      let failedRetry = false
      console.log(`scraping ${place.name}: ${place.url}`)
      const data = await scrapper.fetchText(place.url)
      scrapper.clean(data)
      let details = await scrapper.scrapeHTML(data, place.name)
      const { id, media_type, ...mainDetails } = details
      if (invalidResponse(mainDetails)) {
        console.log(`invalid response from ${place.url}`)
        const retryName = place.name.split(' ').splice(1).join(' ') // try removing the first word (ie. "the")
        if (retryName !== '') {
          const retryUrl = getUrlFromName(retryName)
          console.log(`retrying as ${retryName}: ${retryUrl}`)
          const retryData = await scrapper.fetchText(retryUrl)
          scrapper.clean(retryData)
          const retryDetails = await scrapper.scrapeHTML(retryData, place.name)
          const { retryId, retryMediaType, ...retryMainDetails } = retryDetails
          if (invalidResponse(retryMainDetails)) {
            failedRetry = true
            console.log(`retry failed! (${retryUrl})`)
            newBlacklistQueue.push(place.name.trim())
          } else {
            details = retryDetails
          }
        }
      }

      if (!failedRetry) {
        displayScrapedData.push(mainDetails)
        insert.run(details)
        successfulScrapes++
      }
    } else {
      if (isBlacklisted) {
        console.log(`skipped ${place.name}, it's blacklisted!`)
      } else {
        console.log('skipping ' + place.name)
      }
    }
  })
)
  .finally(() => {
    db.close()
    console.log('db closed')
    console.log(`completed! scraped ${successfulScrapes} new source(s).`)
    if (displayScrapedData.length > 0) console.table(displayScrapedData)
    if (newBlacklistQueue.length > 0) {
      writeFile('./blacklist.txt', '\n' + newBlacklistQueue.join('\n'))
      console.log(
        `\nAttention! We had ${newBlacklistQueue.length} new items blacklisted due to empty results:`
      )
      newBlacklistQueue.forEach((i) => console.log(`* ${i}`))
    }
  })
  .catch((err) => {
    console.log(err) // Continue map loop on exception
  })
