import fetch from 'node-fetch'

async function fetchUrl(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw Error('Network response was not OK')
  }
  const webPageAsText = await response.text()
  return webPageAsText
}

const url = 'https://mediabiasfactcheck.com/data-for-progress'

const resp = fetchUrl(url)
