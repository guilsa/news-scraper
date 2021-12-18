import * as fs from 'fs'

async function writeFile(filePath, data) {
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err
  })
}

export { writeFile }
