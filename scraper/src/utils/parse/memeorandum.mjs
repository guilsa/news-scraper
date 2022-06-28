import cheerio from 'cheerio'

function parseMemeorandum(data) {
  let $ = cheerio.load(data)
  const item = $('.clus .item')

  for (let i = 0; i < item.length; i++) {
    const title = $(item[i]).find('.ii a')
    const citations = $(item[i]).find('.lnkr').text()

    for (let j = 0; j < citations.length; j++) {
      const source = $(citations[j]).find('cite a').text()
    }
  }

  return { title, citations, source }
}

export { parseMemeorandum }
