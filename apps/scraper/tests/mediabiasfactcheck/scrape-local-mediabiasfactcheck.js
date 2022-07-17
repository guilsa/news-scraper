const scrapeIt = require('scrape-it')
fs = require('fs')

// mediabiasfactcheck.html

fs.readFile('./html/nytimes.html', 'utf-8', (err, data) => {
  // attempt #2 - parsing html doc as javascript string
  let h3beforeBeginIdx = data.indexOf('Detailed Report<')
  for (let i = h3beforeBeginIdx; i > h3beforeBeginIdx - 100; i--) {
    if (data.slice(i - 3, i) === '<h3') {
      h3beforeBeginIdx = i - 3
      break
    }
  }
  const endIdx = data.indexOf('>History') - 15

  const cleanedData = data.slice(h3beforeBeginIdx, endIdx)

  console.log('=====')
  console.log('')
  console.log(cleanedData)
  console.log('')
  console.log('=====')

  // attempt #1 - using scrapeIt
  const page = scrapeIt.scrapeHTML(cleanedData, {
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
  console.log(page)
})
