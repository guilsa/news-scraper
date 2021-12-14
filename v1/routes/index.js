var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')

router.get('/', function (req, res) {
  const db = new Database('news.db')
  const articles = db.prepare('SELECT * FROM articles').all()
  res.send(articles)
  db.close()
})

router.get('/sources', function (req, res) {
  const db = new Database('news.db')
  const sources = db.prepare('SELECT * FROM sources').all()
  res.send(sources)
  db.close()
})

module.exports = router
