const scrapeIt = require('scrape-it')

scrapeIt('http://memeorandum.com', {
  articles: {
    listItem: '.clus .item',
    data: {
      title: {
        selector: '.ii a',
      },
      cite: {
        selector: 'cite a',
        how: 'html',
      },
      description: {
        selector: '.ii',
        how: 'text',
        convert: (x) => {
          const indexOf = x.indexOf('—')
          return x.slice(indexOf + 3)
        },
      },
      url: {
        selector: 'a',
        attr: 'href',
      },
    },
  },
  date: {
    selector: '.pagecont .rnhang',
    convert: (d) => {
      const cleanedDate = new Date(d.split(',').slice(1, 3).join('').trim())
      return cleanedDate.toISOString().slice(0, 10)
    },
  },
})
  .then(({ data }) => console.log(data))
  .catch(console.error)
