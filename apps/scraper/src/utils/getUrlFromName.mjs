export default function getUrlFromName(source) {
  source = source.toLowerCase().split(' ').join('-')
  return `https://mediabiasfactcheck.com/${source}/`
}
