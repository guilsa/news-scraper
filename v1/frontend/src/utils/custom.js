// For dates in YYYY-MM-DD format or "similar"
function isValidDateString(str) {
  return str.split('-').length === 3
}

function categoryToString(i) {
  if (i === 'null') return ''
  if (isValidDateString(i)) {
    const date = new Date(i).toLocaleString('en-US')
    return date.substring(0, date.indexOf(','))
  }
  return i
}

export { categoryToString }
