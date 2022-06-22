import { MediaBiasFactCheck } from '../../src/utils/mediaBiasFactCheck.mjs'

const url = 'https://mediabiasfactcheck.com/11-news-kkco/'

const scraper = new MediaBiasFactCheck()

const data = await scraper.fetchText(url)
scraper.clean(data)

const biasDetails = scraper.scrapeDetails(data)

console.log(biasDetails)

// setTimeout(() => {}, 3000)
