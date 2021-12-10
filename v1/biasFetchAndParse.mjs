import fetch from 'node-fetch'
import scrapeIt from 'scrape-it'
import findPrecedingString from './util.mjs'

const { scrapeHTML } = scrapeIt

class MediaBiasFactCheck {
  clean(data) {
    const beginIdx = findPrecedingString(data, 'Detailed Report<', '<h3')
    const endIdx = data.indexOf('>History') - 15

    return data.slice(beginIdx, endIdx)
  }

  scrape(data) {
    return scrapeHTML(data, {
      bias_rating: {
        selector: 'span strong',
        eq: 0,
      },
      factual_reporting: {
        selector: 'span strong',
        eq: 2,
      },
      country: {
        selector: 'strong',
        eq: 3,
      },
      media_type: {
        selector: 'strong',
        eq: 4,
      },
      popularity: {
        selector: 'strong',
        eq: 5,
      },
      mbfc_credibility_rating: {
        selector: 'span strong',
        eq: 3,
      },
    })
  }
}

fetch('https://mediabiasfactcheck.com/11-news-kkco/')
  .then((res) => res.text())
  .then((data) => {
    const scrapper = new MediaBiasFactCheck()
    scrapper.clean(data)
    const biasDetails = scrapper.scrape(data)

    console.log(biasDetails)
  })
