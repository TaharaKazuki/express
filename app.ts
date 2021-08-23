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

app.get('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id
  const tour = tours.find((el) => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  console.info(req.params)
  res.status(200).json({
    status: 'success',
    data: { tour },
  })
})

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = { id: newId, ...req.body }
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-dat/data/tours-simple.json`,
    safeStringify.stableStringify(tours),
    (err) => {
      if (err) {
        console.info('error', err)
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
})

const port = 3000

app.listen(port, () => {
  console.info('app running')
})
