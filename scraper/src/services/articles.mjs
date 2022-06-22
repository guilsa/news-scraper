import Database from 'better-sqlite3'
import scrapeIt from 'scrape-it'

import { hash } from '../utils/util.mjs'

const config = require('../../config')
const db = new Database(config.databaseStorage)

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
  // console.log(articles)
  console.log(`saving ${articles.length} new items\n`)
  for (const article of articles) insert.run(article)
})

const PUBLISHERS = {
  'The New York Times Company': 'New York Times',
  'Young America&apos;s Foundation': 'Young America’s Foundation (YAF)',
  'Raleigh News &amp; Observer': 'Raleigh News Observer',
}

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
          const sanitizedName = PUBLISHERS[s]
          return sanitizedName !== undefined ? sanitizedName : s
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
