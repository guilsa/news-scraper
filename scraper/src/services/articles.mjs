import scrapeIt from 'scrape-it'
import memeorandum from '../scraperConfig/memeorandum.mjs'
import insertArticles from '../utils/db/insertArticles.mjs'

// service to get data, clean, save to db

async function getData(url) {
  const { data } = await scrapeIt((url = 'https://www.memeorandum.com'), memeorandum)
  return data
}

const insertDate = (arr, date) =>
  arr.reduce((prev, curr) => {
    curr['date'] = data.date
    prev.push(curr)
    return prev
  }, [])

const stringifyCitations = (arr) =>
  arr.reduce((prev, curr) => {
    curr['citations'] = curr['citations'].join('; ')
    prev.push(curr)
    return prev
  }, [])

try {
  const data = await getData()
  const articles = data.articles
    // insert date
    .reduce((prev, curr) => {
      curr['date'] = data.date
      prev.push(curr)
      return prev
    }, [])
    // stringify citations
    .reduce((prev, curr) => {
      curr['citations'] = curr['citations'].join('; ')
      prev.push(curr)
      return prev
    }, [])

  insertArticles(articles)
} catch (e) {
  console.log(e)
}
