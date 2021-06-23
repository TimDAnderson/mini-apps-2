const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// app.get('/data/btc/historical', async (req, res) => {
//   try {

//     // const dataFetched = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json');
//     const dataFetched = await axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-09-01&end=2021-05-05');
//     console.log(dataFetched.data);
//     res.send(dataFetched.data);
//   } catch (err) {
//     console.log('Error with GET request to server', err);
//     res.status(404).end();
//   }
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

