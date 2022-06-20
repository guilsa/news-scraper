import * as fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

//
// Rudimentary article scraper
// finds all <p> tags, joins them together, writes to a file
//

const url = 'https://www.economist.com/europe/2021/11/11/how-trains-could-replace-planes-in-europe'

fetch(url)
  .then((res) => res.text())
  .then((data) => {
    const $ = cheerio.load(data)
    const paragraphs = $('p')
    const results = []

    results.push(url)

    for (const p of paragraphs) {
      results.push($(p).first().text())
    }

    return results.join('\n \n')
  })
  .then((results) => {
    fs.writeFile('3.txt', results, function (err) {
      if (err) return console.log(err)
      console.log('file written successfully!')
    })
  })
