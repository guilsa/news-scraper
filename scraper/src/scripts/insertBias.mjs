import Database from 'better-sqlite3'

const config = require('../../config')
const db = new Database(config.databaseStorage)

db.exec(`CREATE TABLE IF NOT EXISTS sources
(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    bias_rating TEXT,
    factual_reporting TEXT,
    country TEXT,
    media_type TEXT,
    popularity TEXT,
    mbfc_credibility_rating TEXT
)`)
const insert = db.prepare(
  'INSERT OR IGNORE INTO sources (id, name, bias_rating, factual_reporting, country, media_type, popularity, mbfc_credibility_rating) VALUES (@id, @name, @bias_rating, @factual_reporting, @country, @media_type, @popularity, @mbfc_credibility_rating)'
)

const insertMany = db.transaction((scrappedData) => {
  console.log('saving...', scrappedData)
  for (const details of scrappedData) insert.run(details)
  console.log('saving done')
})

const data = [
  {
    id: 'NKyV19ppREHQdbctteKz+U9BrJk+IQrzZ4MPOAt6jEI=',
    name: 'Wall Street Journal',
    bias_rating: 'RIGHT-CENTER',
    factual_reporting: 'MOSTLY FACTUAL',
    country: 'MOSTLY FACTUAL',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'XEaQTzpPZ/arbsdby/KHBonONwgUYaqsQ41HuIDenb4=',
    name: 'The Guardian',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'MIXED',
    country: 'MIXED',
    media_type: 'United Kingdom (33/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'MEDIUM CREDIBILITY',
  },
  {
    id: '5a17FjVvMJHWXaq0sH63OLPU89FgLMsfoyPSlC0GReg=',
    name: 'San Francisco Chronicle',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (44/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'fzJmKZyCACiB+gQXGtivRASgNv2+Wui8KJms+OWoVeQ=',
    name: 'Rolling Stone',
    bias_rating: 'LEFT',
    factual_reporting: 'HIGH',
    country: 'USA (44/180 Press Freedom)',
    media_type: 'Magazine',
    popularity: 'High Traffic',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'VvPHctJ5Vb7Gask3QnW4O68Xro89BSFAc0PaCN43aFs=',
    name: 'Washington Post',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'MOSTLY FACTUAL',
    country: 'MOSTLY FACTUAL',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'CzXYi8uAmhgVA3MYl5uojP0zUEZPI5XCuaez15kEuOk=',
    name: 'Yahoo News',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Website',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'v8/TXKaE5kmiJg8L326XVX0DTqESpcnIBzJQWp6VY7Y=',
    name: 'New York Times',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'kAHLj0ikO2GGqcUQeFlJx/bMgFenABWCJ3UiSlJvZgk=',
    name: 'Press Watch',
    bias_rating: '',
    factual_reporting: '',
    country: '',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: 'XIjezQpqK0mDJIHsXc7IlDa728qMgrwHghyn5LTqYtg=',
    name: 'CT Insider',
    bias_rating: '',
    factual_reporting: '',
    country: '',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: '38h38GiXm9N8QxrI4RQnqvvVhC3x1yaIYea7fQtm9mk=',
    name: 'Riverfront Times',
    bias_rating: 'LEFT',
    factual_reporting: '',
    country: '',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: 'wH5ol0JOaIbwZV6JLP7IhmAtHLafFYIp7b7Pi/ESluU=',
    name: 'The Daily Signal',
    bias_rating: 'RIGHT',
    factual_reporting: 'MOSTLY FACTUAL',
    country: 'USA (45/180 Press Freedom)',
    media_type: 'Website',
    popularity: 'Medium Traffic',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'qa86VagjqfKfzteZJJl0HKU9GtTyOXv0Tvm3GlbAzl8=',
    name: 'Kellyforalaska',
    bias_rating: '',
    factual_reporting: '',
    country: '',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: 'hPGwP/5EZNV43MUSzprzVJ9d03ZNG7d7QOF6KyiDU9k=',
    name: 'Commentary Magazine',
    bias_rating: 'MOSTLY FACTUAL',
    factual_reporting: '',
    country: 'USA 45/180',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: 'Jp90KpH45/GqSTynNaIoa8J4tCChR2P1GiUg7eaW76E=',
    name: 'American Greatness',
    bias_rating: 'RIGHT',
    factual_reporting: 'MIXED',
    country: 'MIXED',
    media_type: 'USA (44/180 Press Freedom)',
    popularity: 'Website',
    mbfc_credibility_rating: 'MEDIUM CREDIBILITY',
  },
  {
    id: 'WRocV2tBNCQeBQu0tQuZZ9sB8Bw/GrwdoOtXKkBOkbE=',
    name: 'Milwaukee Journal Sentinel',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'USA (44/180 Press Freedom)',
    country: 'USA (44/180 Press Freedom)',
    media_type: 'Newspaper',
    popularity: 'Medium Traffic',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'pNtMJFT1A7BdRzQibAJqqRMyxjdEDqvXiG+vUzBKhVE=',
    name: 'The Hill',
    bias_rating: 'LEAST BIASED',
    factual_reporting: 'MOSTLY FACTUAL',
    country: 'MOSTLY FACTUAL',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: '01gzRBqZBhFewPc7ioAeObN+XWKpIJe1zsvCL+C7vZE=',
    name: 'Mediaite',
    bias_rating: 'LEFT',
    factual_reporting: 'MOSTLY FACTUAL',
    country: 'USA (44/180 Press Freedom)',
    media_type: 'Website',
    popularity: 'High Traffic',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'M7k0ds9ZejMwZTtmpliYPYkqwmS11gKaLcZCubHzCHA=',
    name: 'Time',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Magazine',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'fALihU38W+OAtE1j2YRL3eRuKRaOZvCjiDP780GVO7E=',
    name: 'ABC News',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'TV Station',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: '4NMo7xxae4nFdgp//BCnTTUebFKLsk0XqA2jGiLNZmM=',
    name: 'NBC News',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'TV Station',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: '2vM12CUuI3gE1L5UKqDR9cLIIUu0JDbBuSYtgPEVlDg=',
    name: 'New York Post',
    bias_rating: 'RIGHT-CENTER',
    factual_reporting: 'MIXED',
    country: 'MIXED',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'MEDIUM CREDIBILITY',
  },
  {
    id: 'EK1MOHNjb6i82UNJPMW0sX4WSn9X4waxJP9vGp880ms=',
    name: 'Slate',
    bias_rating: 'LEFT',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Website',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: '2JdhzR6h4D5PpnY46cS8ZjN4ZVZosQ5r/sRDF7ZBmn0=',
    name: 'Media Matters for America',
    bias_rating: 'LEFT',
    factual_reporting: 'HIGH',
    country: 'USA (44/180 Press Freedom)',
    media_type: 'Organization/Foundation',
    popularity: 'Medium Traffic',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'fXYqRXOa2VCeCTeIm52WfEf4MTbatkhwWTnzMQWEIHk=',
    name: 'MSNBC',
    bias_rating: 'LEFT',
    factual_reporting: 'MIXED',
    country: 'MIXED',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'TV Station',
    mbfc_credibility_rating: 'MEDIUM CREDIBILITY',
  },
  {
    id: 'VZYf2MWiqHzTZ9JLbs66StZYtsqbzPBbSdr6giT//KA=',
    name: 'Insider',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (44/180 Press Freedom)',
    popularity: 'Website',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'qqCLZAMt9iWH9aU9mhcDMUp66zbdgs7wdTSd5FaZp1w=',
    name: 'Axios',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Website',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'ghzX3Mv3OqccSG7LtLkJ+cN4KrURYVFe3rnMIe/RhHg=',
    name: 'Politico',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (44/180 Press Freedom)',
    popularity: 'Website',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'I/EYytw1FDk6ucKKoz1XNaRvZKL+SnX/1Rsi9tfGDt8=',
    name: 'National Review',
    bias_rating: 'RIGHT',
    factual_reporting: 'MOSTLY FACTUAL',
    country: 'MOSTLY FACTUAL',
    media_type: 'USA (44/180 Press Freedom)',
    popularity: 'Magazine',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'V3A1GTkctkvytkfWuwXsJct50PvjuxfqQID+fNDosSk=',
    name: 'Reuters',
    bias_rating: 'LEAST BIASED',
    factual_reporting: 'VERY',
    country: 'VERY',
    media_type: 'HIGH',
    popularity: 'United Kingdom (34/180 Press Freedom)',
    mbfc_credibility_rating: 'HIGH',
  },
  {
    id: '40VUKbE6y1IgaVtODv6POvscTeZHmOcE8cysMIGOksw=',
    name: 'The Atlantic',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Magazine',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
  {
    id: 'bLiKfl29AI4t69mia6NbtdSaFu6JLrpbBJ9WwbCfXFU=',
    name: 'Associated Press',
    bias_rating: 'LEAST BIASED',
    factual_reporting: 'VERY',
    country: 'VERY',
    media_type: 'HIGH',
    popularity: 'USA (44/180 Press Freedom)',
    mbfc_credibility_rating: 'HIGH',
  },
  {
    id: 'sIhClvM82z0Ub6Qi2qiH9vNJ/322iKqfaRl/joLpGLg=',
    name: 'The White House',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'MOSTLY FACTUAL',
    country: '',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: '+3rM//jG+OqbA8ke5VdtDQgIDpujWRjYAarrYCDbyIw=',
    name: 'YouTube',
    bias_rating: '',
    factual_reporting: '',
    country: '',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: '17C76jqTUiLEGYw44wsus+ER0R3qh/pTVH6sHIpP8Ds=',
    name: 'WORLD',
    bias_rating: '',
    factual_reporting: '',
    country: '',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: 'u5IyPM9rx1R9uc4QzzgynPB5xbR+8RQkHk4jBZGYnI0=',
    name: 'Young America’s Foundation (YAF)',
    bias_rating: 'RIGHT',
    factual_reporting: 'HIGH',
    country: 'USA 48/180',
    media_type: '',
    popularity: '',
    mbfc_credibility_rating: '',
  },
  {
    id: 'Hz1H2swaGaXvoirCfWk23L9XKVvQMFk/93mlJ71I2wI=',
    name: 'CNN',
    bias_rating: 'LEFT',
    factual_reporting: 'MEDIUM CREDIBILITY',
    country: 'MIXED',
    media_type: 'USA (44/180 Press Freedom)',
    popularity: 'TV Station',
    mbfc_credibility_rating: 'MEDIUM CREDIBILITY',
  },
  {
    id: 'v8rcDASOTrFPWhsq8UIVyG6VLqr36rjXG6UCa49Ydl8=',
    name: 'USA Today',
    bias_rating: 'LEFT-CENTER',
    factual_reporting: 'HIGH',
    country: 'HIGH',
    media_type: 'USA (45/180 Press Freedom)',
    popularity: 'Newspaper',
    mbfc_credibility_rating: 'HIGH CREDIBILITY',
  },
]

insertMany(data)
