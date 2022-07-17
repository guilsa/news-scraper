import cheerio from 'cheerio'

function parseMemeorandum(data) {
  const results = []

  let $ = cheerio.load(data)
  const item = $('.clus .item')

  for (let i = 0; i < item.length; i++) {
    const title = $(item[i]).find('.ii a').text()
    const citationElements = $(item[i]).find('.lnkr')

    const citations = []

    for (let j = 0; j < citationElements.length; j++) {
      const name = $(citationElements[j]).find('cite a').text()
      if (name.length > 0) citations.push(name)
    }

    results.push({ title, citations })
  }

  return results
}

export { parseMemeorandum }
