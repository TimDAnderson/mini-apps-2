const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/hi', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Bowling app listening at http://localhost:${port}`)
})
