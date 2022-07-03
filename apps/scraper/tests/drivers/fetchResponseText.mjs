import fetch from 'node-fetch'

export default async function fetchResponseText(url = 'https://www.memeorandum.com') {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`An error has occured: ${response.status}`)
  }
  return response.text()
}
