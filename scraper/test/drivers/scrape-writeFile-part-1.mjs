import * as fs from 'fs'
import fetch from 'node-fetch'

//
// Fetch url and save to file
//

fetch('https://mediabiasfactcheck.com/9news-kusa/')
  .then((res) => res.text())
  .then((data) => {
    fs.writeFile('9news-kusa.html', data, function (err) {
      if (err) return console.log(err)
      console.log('file written successfully!')
    })
  })
