// By reading from file, we can develop and test
// without making any network requests

import * as fs from 'fs'
import { JSDOM } from 'jsdom'
// import * as cheerio from 'cheerio'

fs.readFile('atlantic_article.json', 'utf-8', (err, data) => {
  
  // using jsdom

  const dom = new JSDOM(data).window.document
  const paragraphs = dom.querySelectorAll('p')
  for (const p of paragraphs) {
    console.log(p.textContent);
    console.log('')
  }

  // or...
  // using cheerio

  // const $ = cheerio.load(data)
  // const paragraphs = $('p')
  // let results = []

  // for (const p of paragraphs) {
  //   console.log($(p).first().text())
  //   console.log('')
  // }
})
