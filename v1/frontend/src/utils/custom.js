import dayjs from 'dayjs'

// For dates in YYYY-MM-DD format or "similar"
function isValidDateString(str) {
  return str.split('-').length === 3
}

function categoryToString(i) {
  if (i === 'null') return ''
  if (isValidDateString(i)) {
    return dayjs(i).format('MM/DD/YYYY')
  }
  return i
}

function formatLastModified(date) {
  return new Date(date)?.toLocaleString().split(', ')[1]
}

export { categoryToString, formatLastModified }
