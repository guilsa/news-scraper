import fetch from 'node-fetch'
import scrapeIt from 'scrape-it'
import { findPrecedingString, hash } from './util.mjs'

const { scrapeHTML } = scrapeIt

class Scrapper {
  async fetchText(url) {
    const response = await fetch(url)
    if (!response.ok) {
      throw Error('Network response was not OK')
    }
    const webPageAsText = await response.text()
    return webPageAsText
  }
}

class MediaBiasFactCheck extends Scrapper {
  clean(data) {
    const beginIdx = findPrecedingString(data, 'Detailed Report<', '<h3')
    const endIdx = data.indexOf('>History') - 15

    return data.slice(beginIdx, endIdx)
  }

  async scrapeHTML(data, websiteName) {
    const response = await scrapeHTML(data, {
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

    return {
      id: hash(websiteName),
      name: websiteName,
      ...response,
    }
  }
}

export { MediaBiasFactCheck }
