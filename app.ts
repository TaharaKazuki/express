import fs from 'fs'
import express from 'express'
import morgan from 'morgan'
import safeStringify from 'fast-safe-stringify'

import toursJSON from './dev-data/data/tours-simple.json'


type responseType = typeof toursJSON

const app = express()

// log middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))



const tours: responseType = JSON.parse(
  `${fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)}`
)

app.get('/api/v1/tours', (_req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  })
})

app.post('/api/v1/tours', (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1
  const newTours = {id: newTourId, ...req.body}
  tours.push(newTours)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, safeStringify.stableStringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTours
      }
    })
  })
  res.send('Done')  
})

const port = 3000

app.listen(port, () => {
  console.info('app running')
})
