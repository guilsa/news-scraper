var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')

router.get('/articles', function (req, res) {
  const db = new Database('news.db')
  try {
    const lastModified = db.prepare('select createdAt from articles order by createdAt desc limit 1').get()
    console.log('lastModified', lastModified)
    const articles = db
      .prepare(
        'select articles.id, articles.title, articles.source, articles.description, articles.url, articles.date, articles.createdAt, lower(sources.bias_rating) as bias_rating from articles left join sources on articles."source" = sources."name" order by createdAt desc'
      )
      .all()
    res.send({
      articles: articles,
      last_modified: lastModified.createdAt,
    })
  } catch (err) {
    console.log('err', err)
  }
  db.close()
})

module.exports = router
