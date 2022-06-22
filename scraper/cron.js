const util = require('util')
const exec = util.promisify(require('child_process').exec)
const cron = require('node-cron')

const everyHour = '0 * * * *'
const everyFiveMins = '*/5 * * * *'
const everyThirtyMins = '*/30 * * * *'

cron.schedule(everyThirtyMins, function () {
  console.log(`scraping articles (${new Date().toLocaleString()})...`)
  startArticleScraper()
})

async function startArticleScraper() {
  try {
    const { stdout, stderr } = await exec('node ./src/services/articles.mjs')
    console.table({ stdout, stderr })
    //console.log('stdout:', stdout)
    //console.log('stderr:', stderr)
  } catch (e) {
    console.error(e)
  }
}
