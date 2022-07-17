import fetch from 'node-fetch'
import scrapeIt from 'scrape-it'
import { findPrecedingString, hash } from './util.mjs'

const { scrapeHTML } = scrapeIt

class Scraper {
  constructor(urlName = null) {
    this.urlName = urlName
  }

  async fetchText(url) {
    const response = await fetch(url)
    // if (!response.ok) {
    // throw { errorMessage: 'Network response was not OK', cause: this.urlName }
    // throw Error('Network response was not OK')
    // }
    const webPageAsText = await response.text()
    return webPageAsText
  }
}

class MediaBiasFactCheck extends Scraper {
  constructor(urlName) {
    super(urlName)
  }

  clean(data) {
    const beginIdx = findPrecedingString(data, 'Detailed Report<', '<h3')
    const endIdx = data.indexOf('>History') - 15

    return data.slice(beginIdx, endIdx)
  }

  async scrapeHTML(data, websiteName) {
    this.urlName = websiteName

    const response = await scrapeHTML(data, {
      bias_rating: {
        selector: 'span strong',
        eq: 0,
        convert: (i) => {
          if (i === 'Your Support is Essential') return ''
          return i
        },
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
