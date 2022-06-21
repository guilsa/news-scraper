// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// If NODE_ENV is undefined, set databaseStorage to dev
module.exports = {
  databaseStorage: process.env.NODE_ENV === 'development' ? './news-dev.db' : './news-prod.db',
}
