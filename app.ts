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
  const newId = tours[tours.length - 1].id + 1
  const newTours = Object.assign({id: newId}, req.body)
  tours.push(newTours)
  fs.writeFile(`${__dirname}/dev-dat/data/tours-simple.json`, safeStringify.stableStringify(tours), (error) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTours
      }
    })  
  })
})

const port = 3000

app.listen(port, () => {
  console.info('app running')
})
