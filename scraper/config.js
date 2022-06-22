// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const databaseDirectory = '../database'

const dev = databaseDirectory + '/development/news-dev.db'
const prod = databaseDirectory + '/production/news-prod.db'

module.exports = {
  databaseStorage: process.env.NODE_ENV === 'development' ? dev : prod,
}
