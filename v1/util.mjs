function findPrecedingString(data, beginStr, precedingStr, precedeLimit = 100) {
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

export default findPrecedingString