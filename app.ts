import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('hello from the server side')
})

const port = 3000

app.listen(port, () => {
  console.info('app aarunning')
})
