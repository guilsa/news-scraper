import Database from 'better-sqlite3'

import { databaseStorage } from '../../../config.mjs'
const db = new Database(databaseStorage)

db.exec(`CREATE TABLE IF NOT EXISTS articles
(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    title TEXT NOT NULL,
    source TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    date TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    citations TEXT NOT NULL
)`)

const insert = db.prepare(
  'INSERT OR IGNORE INTO articles (id, title, source, description, url, date, createdAt, citations) VALUES (@id, @title, @source, @description, @url, @date, @createdAt, @citations)'
)

const insertArticles = db.transaction((articles) => {
  // console.log(articles)
  console.log(`saving ${articles.length} new items\n`)
  for (const article of articles) {
    insert.run(article)
  }
})

export default insertArticles
