import Database from 'better-sqlite3'
import scrapeIt from 'scrape-it'

import { hash } from './utils/util.mjs'

const db = new Database('news.db')

db.exec(`CREATE TABLE IF NOT EXISTS articles
(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    date TEXT NOT NULL,
    createdAt TEXT NOT NULL
)`)

const insert = db.prepare(
  'INSERT OR IGNORE INTO articles (id, title, source, description, url, date, createdAt) VALUES (@id, @title, @source, @description, @url, @date, @createdAt)'
)

const insertArticles = db.transaction((articles) => {
  console.log(articles)
  for (const article of articles) insert.run(article)
})

scrapeIt('https://www.memeorandum.com', {
  articles: {
    listItem: '.clus .item',
    data: {
      id: {
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
          const yaf = 'Young America&apos;s Foundation'

          if (s === nyt) {
            return 'New York Times'
          } else if (s === yaf) {
            return 'Young America’s Foundation (YAF)'
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
      createdAt: {
        convert: () => new Date().toISOString(),
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
