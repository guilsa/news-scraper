const express = require('express')

const app = express()

app.use(express.static('./tests/utils/server/public'))

module.exports = app
