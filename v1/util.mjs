import crypto from 'crypto'

function findPrecedingString(data, beginStr, precedingStr, precedeLimit = 100) {
  if (!data) return
  let beginIdx = data.indexOf(beginStr)
  const limit = beginIdx - precedeLimit

  for (let i = beginIdx; i > limit; i--) {
    if (data.slice(i - 3, i) === precedingStr) {
      beginIdx = i - 3
      break
    }
    if (i === beginIdx - 100 - 1) console.error('Bad cleanData(), check beginIdx')
  }

  return beginIdx
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function hash(url) {
  return crypto.createHash('sha256').update(url.trim()).digest('base64')
}

export { findPrecedingString, sleep, hash }
