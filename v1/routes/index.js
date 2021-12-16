var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')

router.get('/articles', function (req, res) {
  const db = new Database('news.db')
  try {
    const articles = db
      .prepare(
        'select articles.id, articles.title, articles.source, articles.description, articles.url, articles.date, articles.createdAt, lower(sources.bias_rating) as bias_rating from articles left join sources on articles."source" = sources."name" order by createdAt'
      )
      .all()
    res.send(articles)
  } catch (err) {
    console.log('err', err)
  }
  db.close()
})

module.exports = router
