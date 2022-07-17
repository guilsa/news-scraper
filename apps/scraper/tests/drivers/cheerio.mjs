import fs from 'fs'
// import { JSDOM } from 'jsdom'
import cheerio from 'cheerio'

fs.readFile('./tests/utils/server/public/index.html', 'utf-8', (err, data) => {
  // using jsdom
  // console.log(data);
  // const dom = new JSDOM(data).window.document
  // const paragraphs = dom.querySelectorAll('p')
  // for (const p of paragraphs) {
  //   console.log(p.textContent);
  //   console.log('')
  // }

  // or...
  // using cheerio

  
  // commit - articles with citations source name and length
  // example
  let $ = cheerio.load(data)
  const container = $('.clus .item')

  for (let i = 0; i < container.length; i++) {
    const el = $(container[i]).find('.ii a')
    console.log(el.text())

    const discussion = $(container[i]).find('.lnkr')
    console.log(discussion.length)
    for (let j = 0; j < discussion.length; j++) {
      const el2 = $(discussion[j]).find('cite a')
      console.log(el2.text())
      // console.log(discussion[j].text())
      //   const el2 = $(discussion[j]).find('a')
      //   console.log(el2.text())
    }

    console.log('')
  }

  // example
  // const paragraphs = $('p')
  // let results = []

  // for (const p of paragraphs) {
  //   console.log($(p).first().text())
  //   console.log('')
  // }
})
