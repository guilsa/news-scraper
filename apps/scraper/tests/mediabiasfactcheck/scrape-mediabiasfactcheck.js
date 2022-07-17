const scrapeIt = require('scrape-it')

scrapeIt('https://mediabiasfactcheck.com/left/cnn-bias/', {
  bias_rating: {
    selector: 'p strong',
    eq: 0,
  },
  factual_reporting: {
    selector: 'p strong',
    eq: 1,
  },
  country: {
    selector: 'p strong',
    eq: 2,
  },
  media_type: {
    selector: 'p strong',
    eq: 3,
  },
  popularity: {
    selector: 'p strong',
    eq: 4,
  },
  mbfc_credibility_rating: {
    selector: 'p strong',
    eq: 5,
  },
  funded_by: {
    selector: 'p',
    eq: 5,
  },
})
  .then(({ data }) => console.log(data))
  .catch(console.error)
