const util = require('util')
const exec = util.promisify(require('child_process').exec)
const cron = require('node-cron')

const everyHour = '0 * * * *'
const everyFiveMins = '*/5 * * * *'

cron.schedule(everyFiveMins, function () {
  console.log(`scrapping articles (${new Date().toLocaleString()})...`)
  startArticleScraper()
})

async function startArticleScraper() {
  try {
    const { stdout, stderr } = await exec('node articlesScrapeSave.mjs')
    console.table({ stdout, stderr })
    //console.log('stdout:', stdout)
    //console.log('stderr:', stderr)
  } catch (e) {
    console.error(e)
  }
}
