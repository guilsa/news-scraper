import { MediaBiasFactCheck } from '../biasScrapper.mjs'

const url = 'https://mediabiasfactcheck.com/11-news-kkco/'

const scrapper = new MediaBiasFactCheck()

const data = await scrapper.fetchText(url)
scrapper.clean(data)

const biasDetails = scrapper.scrapeDetails(data)

console.log(biasDetails)

// setTimeout(() => {}, 3000)
