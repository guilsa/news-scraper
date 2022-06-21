const Database = require('better-sqlite3')
const config = require('../config')

const db = new Database(config.databaseStorage)
module.exports = db
