import fs from 'fs'
import express from 'express'
import toursJSON from './dev-data/data/tours-simple.json'
type responseType = typeof toursJSON

const app = express()

const tours: responseType = JSON.parse(
  `${fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)}`
)

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  })
})

const port = 3000

app.listen(port, () => {
  console.info('app running')
})
