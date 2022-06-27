const app = require('./server')

const port = 3001

app.listen(port, () => {
  console.log(`Test server listening on port ${port}`)
})
