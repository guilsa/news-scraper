import * as fs from 'fs'

// README
// Q: How to push each line to array?
// A: const data = await readFile('./blacklist.txt')
//    console.log(data.toString().split('\n'))

async function readFile(filePath, isJSON=false) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8')
    return isJSON ? JSON.parse(data) : data
  } catch (err) {
    console.log(err)
  }
}

export { readFile }
