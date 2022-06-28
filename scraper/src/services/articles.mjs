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
    curr['date'] = date
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
  const articles = stringifyCitations(insertDate(data.articles, data.date))
  console.log(articles)

  insertArticles(articles)
} catch (e) {
  console.log(e)
}
