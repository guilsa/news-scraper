import Database from 'better-sqlite3'
import scrapeIt from 'scrape-it'

import { hash } from './util.mjs'

const db = new Database('news.db')

db.exec(`CREATE TABLE IF NOT EXISTS articles
(
    hash TEXT NOT NULL UNIQUE PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    date TEXT
)`)

const insert = db.prepare(
  'INSERT OR IGNORE INTO articles (hash, title, source, description, url, date) VALUES (@hash, @title, @source, @description, @url, @date)'
)

const insertArticles = db.transaction((articles) => {
  console.log(articles)
  for (const article of articles) insert.run(article)
})

scrapeIt('https://www.memeorandum.com', {
  articles: {
    listItem: '.clus .item',
    data: {
      hash: {
        selector: 'a',
        attr: 'href',
        convert: (url) => hash(url),
      },
      title: {
        selector: '.ii a',
      },
      source: {
        selector: 'cite a',
        how: 'html',
        convert: (s) => {
          const nyt = 'The New York Times Company'
          if (s === nyt) {
            return 'New York Times'
          } else {
            return s
          }
        },
      },
      description: {
        selector: '.ii',
        how: 'text',
        convert: (desc) => desc.slice(desc.indexOf('—') + 3),
      },
      url: {
        selector: 'a',
        attr: 'href',
      },
    },
  },
  date: {
    selector: '.pagecont .rnhang',
    convert: (d) => {
      // d -> 7:30 PM ET, December 9, 2021 (example)
      const cleanedDate = new Date(d.split(',').slice(1, 3).join('').trim())
      return cleanedDate.toISOString().slice(0, 10)
    },
  },
})
  .then(({ data }) => {
    const { articles, date } = data
    const mergedData = insertDateInArticles(articles, date)
    insertArticles(mergedData)
  })
  .catch(console.error)
  .finally(() => {
    db.close()
  })

function insertDateInArticles(articles, date) {
  for (const article of articles) {
    article['date'] = date
  }
  return articles
}
