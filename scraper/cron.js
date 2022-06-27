const util = require('util')
const exec = util.promisify(require('child_process').exec)
const cron = require('node-cron')

const everyHour = '0 * * * *'
const everyFiveMins = '*/5 * * * *'
const everyThirtyMins = '*/30 * * * *'
const everyMin = '* * * * *'

cron.schedule(everyThirtyMins, function () {
  console.log(`scraping...`)
  startArticleScraper()
})

const filepath = 'node ./src/services/articles.mjs'

async function startArticleScraper() {
  try {
    const { stdout, stderr } = await exec(filepath)
    console.log(`${new Date().toISOString()}: ${stdout}`)
    if (stderr) console.log('error:', stderr)
  } catch (e) {
    console.error(e)
  }
}
