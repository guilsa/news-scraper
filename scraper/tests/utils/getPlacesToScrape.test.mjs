import { getPlacesToScrape } from '../../utils/getPlacesToScrape.mjs'

const publishers = [
  'Bloomberg',
  'medRxiv',
  'The Atlantic',
  'Defense One',
  'Washington Examiner',
  'Axios',
  'Politico',
  'New York Times',
]

const expected = [
  {
    name: 'Bloomberg',
    url: 'https://mediabiasfactcheck.com/bloomberg/',
  },
  { name: 'medRxiv', url: 'https://mediabiasfactcheck.com/medrxiv/' },
  {
    name: 'The Atlantic',
    url: 'https://mediabiasfactcheck.com/the-atlantic/',
  },
  {
    name: 'Defense One',
    url: 'https://mediabiasfactcheck.com/defense-one/',
  },
  {
    name: 'Washington Examiner',
    url: 'https://mediabiasfactcheck.com/washington-examiner/',
  },
  { name: 'Axios', url: 'https://mediabiasfactcheck.com/axios/' },
  { name: 'Politico', url: 'https://mediabiasfactcheck.com/politico/' },
  {
    name: 'New York Times',
    url: 'https://mediabiasfactcheck.com/new-york-times/',
  },
]

const actual = getPlacesToScrape(publishers)
console.log(JSON.stringify(actual) === JSON.stringify(expected))
