const Database = require('better-sqlite3')

var express = require('express')
const config = require('../config')

var router = express.Router()

const middleware = [validatePaginationLimit, paginatedResults, sortByCitations, groupBy]

router.get('/articles', middleware, function (req, res) {
  res.json(res.paginatedResults)
})

function getKeyIdx(array, key) {
  for (let i = 0; i < array.length; i++) {
    const currentKey = array[i][0]
    if (currentKey === key) return i
  }
  return -1
}

function groupBy(req, res, next) {
  res.paginatedResults.results = res.paginatedResults.results.reduce((store, item) => {
    const { date, id, ...other } = item
    const indexOf = getKeyIdx(store, date)
    if (indexOf !== -1) {
      store[indexOf][1].push({ id, ...other })
    } else {
      store.push([date, [{ id, ...other }]])
    }

    return store
  }, [])

  next()
}

function sortByCitations(req, res, next) {
  res.paginatedResults.results = res.paginatedResults.results
    .reduce((storage, item) => {
      item['totalCitations'] = item['citations'] === null ? 0 : item['citations'].split('; ').length
      storage.push(item)
      return storage
    }, [])
    .sort((a, b) => b['totalCitations'] - a['totalCitations'])
  next()
}

function validatePaginationLimit(req, res, next) {
  const PAGE_LIMIT = 50
  const limit = parseInt(req.query.limit)
  if (limit > 50) {
    req.query.limit = PAGE_LIMIT
  }
  next()
}

function paginatedResults(req, res, next) {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  try {
    const db = new Database(config.databaseStorage)
    const lastModified = db.prepare('select createdAt from articles order by createdAt desc limit 1').get()

    const stmt = db.prepare(
      `SELECT
          articles.id,
          articles.title,
          articles.source,
          articles.description,
          articles.url,
          articles.date,
          articles.createdAt,
          articles.citations,
          lower(bias.bias_rating)
        AS bias_rating
        FROM articles
        LEFT JOIN
          bias ON articles."source" = bias."name"
        ORDER BY createdAt
        DESC LIMIT ?,?;`
    )
    const articles = stmt.all(startIndex, limit)
    const stmt2 = db.prepare(`SELECT count(*) from articles;`)
    const count = stmt2.all()[0]['count(*)']

    const results = {}

    results.results = articles
    results.last_modified = lastModified.createdAt

    if (endIndex < count) {
      results.next = {
        page: page + 1,
        limit: limit,
      }
    }

    res.paginatedResults = results
    db.close()
    next()
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message })
  }
}

module.exports = router
