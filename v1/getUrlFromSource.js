// Raw Story
function getUrlFromSource(source) {
  source = source.toLowerCase().split(' ').join('-')
  return `https://mediabiasfactcheck.com/${source}/`
}

const sources = [
  'Politico',
  'CNN',
  'Washington Post',
  'New York Times',
  'Reuters',
  'New York Times',
  'New York Times',
  'The Atlantic',
  'CNN',
  'OutKick',
  'Raw Story',
  'New York Post',
  'Kansas City Star',
  'Rolling Stone',
  'HuffPost',
  'Bloomberg',
  'The Atlantic',
  'Washington Monthly',
  'Southern Poverty Law Center',
  'New York Times',
  'Miami Herald',
  'United States Capitol Police',
  'Washington Post',
  'New York Post',
  'The Liberal Patriot',
  'WTKR-TV',
  'Washington Post',
  'Associated Press',
  'Data For Progress',
  'Washington Post',
  'The Truth Fairy',
  'Gizmodo',
  'al.com',
  'The Federalist',
  'Minnesota Department of Health',
  'Washington Post',
  'STAT',
  'HuffPost',
  'Washington Post',
  'Politico',
  'New York Times',
  'CNN',
  'HotAir',
  'The Atlantic',
  'Mother Jones',
  'Politico',
  'BuzzFeed News',
  'New York Times',
  'Wall Street Journal',
]

for (source of sources) {
  console.log(getUrlFromSource(source));
}