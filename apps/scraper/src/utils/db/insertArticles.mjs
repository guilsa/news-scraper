import Database from 'better-sqlite3'

import { databaseStorage } from '../../../config.mjs'
const db = new Database(databaseStorage)

const insert = db.prepare(
  'INSERT OR IGNORE INTO articles (title, source, description, url, date, createdAt, citations) VALUES (@title, @source, @description, @url, @date, @createdAt, @citations)'
)

const insertArticles = db.transaction((articles) => {
  // console.log(articles)
  for (const article of articles) {
    insert.run(article)
  }
  console.log(`saved ${articles.length} new items\n`)
})

export default insertArticles
