import fs from 'fs'
import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import safeStringify from 'fast-safe-stringify'

import toursJSON from './dev-data/data/tours-simple.json'

type responseType = typeof toursJSON

const app: Express = express()

// log middleware
// if (process.env.NODE_ENV == 'development') {
app.use(morgan('dev'))
// }

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

const tours: responseType = JSON.parse(
  `${fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)}`
)

const getAllTours = (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  })
}

const getTour = (req: Request, res: Response) => {
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
}

const createTour = (req: Request, res: Response) => {
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
}
const updateTour = (req: Request, res: Response) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  res.status(200).json({
    data: {
      tour: '<Updata tour here ...>',
    },
  })
}

const deleteTour = (req: Request, res: Response) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  res.status(200).json({
    data: {
      tour: '<Delete tour>',
    },
  })
}

const getAllUsers = (_req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  })
}

const createUsers = (_req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  })
}

const getUser = (_req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  })
}

const updateUser = (_req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  })
}

const deleteUser = (_req: Request, res: Response) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

app.route('/api/v1/users').get(getAllUsers).post(createUsers)
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser)

const PORT = 3000

app.listen(PORT, () => {
  console.info(`app running PORT:${PORT}`)
})
