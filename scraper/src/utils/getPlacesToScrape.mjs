import getUrlFromName from './getUrlFromName.mjs'

export function getPlacesToScrape(publishers) {
  return publishers.map((publisher) => {
    return { name: publisher, url: getUrlFromName(publisher) }
  })
}
