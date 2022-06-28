import scrapeIt from 'scrape-it'
import memeorandum from '../scraperConfig/memeorandum.mjs'
import insertArticles from '../utils/db/insertArticles.mjs'

// service to get data, clean, save to db

async function getData(url) {
  const { data } = await scrapeIt((url = 'https://www.memeorandum.com'), memeorandum)
  return data
}

function insertDateInArticles(articles, date) {
  for (const article of articles) {
    article['date'] = date
  }
  return articles
}

function stringifyCitations(articles) {
  for (const article of articles) {
    article['citations'] = article['citations'].join('; ')
  }
  return articles
}

try {
  const data = await getData()
  const articles = insertDateInArticles(data.articles, data.date)
  const articles2 = stringifyCitations(articles)
  console.log('articles2', articles2)

  insertArticles(articles)
} catch (e) {
  console.log(e)
}
