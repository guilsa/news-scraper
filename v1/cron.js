const util = require('util')
const exec = util.promisify(require('child_process').exec)
const cron = require('node-cron')

cron.schedule('0 * * * *', function () {
  console.log(`scrapping articles (${new Date().toLocaleString()})`)
  startArticleScraper()
})

async function startArticleScraper() {
  try {
    const { stdout, stderr } = await exec('node articlesScrapeSave.mjs')
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
  } catch (e) {
    console.error(e)
  }
}
