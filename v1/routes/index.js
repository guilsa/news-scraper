var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')

router.get('/', function (req, res) {
  const db = new Database('news.db')
  const articles = db.prepare('SELECT * FROM articles order by createdAt').all()
  res.send(articles)
  db.close()
})

router.get('/sources', function (req, res) {
  const db = new Database('news.db')
  try {
    const sources = db.prepare('SELECT * FROM sources').all()
  } catch (err) {
    return res.status(202).send('No Content')
  }
  res.send(sources)
  db.close()
})

module.exports = router
