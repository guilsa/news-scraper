import * as fs from 'fs'

// README
// Q: How to push each line to array?
// A: const data = await readFile('./blacklist.txt')
//    console.log(data.toString().split('\n'))

async function readFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8')
    return data
  } catch (err) {
    console.log(err)
  }
}

export { readFile }
