var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')

router.get('/articles', function (req, res) {
  const { publication } = req.query

  const db = new Database('news.db')
  try {
    const lastModified = db.prepare('select createdAt from articles order by createdAt desc limit 1').get()

    // Left Join
    // Combine some data from articles table and sources table
    // (sources.bias rating), using a left join.
    // Returns all records from the left table and the matching
    // records from the right table.

    const stmt = db.prepare(
      `SELECT
        articles.id,
        articles.title,
        articles.source,
        articles.description,
        articles.url,
        articles.date,
        articles.createdAt,
        lower(sources.bias_rating)
      AS bias_rating
      FROM articles
      LEFT JOIN
        sources ON articles."source" = sources."name"
      WHERE articles.source LIKE (?)
      ORDER BY createdAt
      DESC LIMIT 200;`
    )

    const hasPublication = publication !== undefined && publication.length > 0
    const articles = stmt.all(hasPublication ? publication : '%')

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
