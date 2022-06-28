import { hash } from '../utils/util.mjs'

const PUBLISHERS = {
  'The New York Times Company': 'New York Times',
  'Young America&apos;s Foundation': 'Young America’s Foundation (YAF)',
  'Raleigh News &amp; Observer': 'Raleigh News Observer',
}

export default {
  articles: {
    listItem: '.clus .item',
    data: {
      id: {
        selector: 'a',
        attr: 'href',
        convert: (url) => hash(url),
      },
      title: {
        selector: '.ii a',
      },
      source: {
        selector: 'cite a',
        how: 'html',
        convert: (s) => {
          const sanitizedName = PUBLISHERS[s]
          return sanitizedName !== undefined ? sanitizedName : s
        },
      },
      description: {
        selector: '.ii',
        how: 'text',
        convert: (desc) => desc.slice(desc.indexOf('—') + 3),
      },
      url: {
        selector: 'a',
        attr: 'href',
      },
      createdAt: {
        convert: () => new Date().toISOString(),
      },
    },
  },
  date: {
    selector: '.pagecont .rnhang',
    convert: (d) => {
      // d -> 7:30 PM ET, December 9, 2021 (example)
      const cleanedDate = new Date(d.split(',').slice(1, 3).join('').trim())
      return cleanedDate.toISOString().slice(0, 10)
    },
  },
}
