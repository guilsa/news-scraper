import * as fs from 'fs'
import fetch from 'node-fetch'

fetch('https://mediabiasfactcheck.com/fox-news-bias/')
  .then((res) => res.text())
  .then((data) => {
    
  })
