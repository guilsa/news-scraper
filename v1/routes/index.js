var express = require('express')
var router = express.Router()

const Database = require('better-sqlite3')

router.get('/', function (req, res) {
  const db = new Database('news.db')
  const articles = db.prepare('SELECT * FROM articles').all()
  res.send(articles)
  db.close()
})

module.exports = router
