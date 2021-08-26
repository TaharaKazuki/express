import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import toursJson from '../dev-data/data/tours-simple.json'
import safeStringify from 'fast-safe-stringify'

type ResponseToursType = typeof toursJson
type ResponseStatusType = Response<any, Record<string, any>> | undefined

const tours: ResponseToursType = JSON.parse(
  `${fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)}`
)

export const checkID = (
  req: Request,
  res: Response,
  next: NextFunction
): ResponseStatusType => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  next()
}

export const checkBody = (
  req: Request,
  res: Response,
  next: NextFunction
): ResponseStatusType => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    })
  }
  next()
}

export const getAllTours = (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
  })
}

export const getTour = (req: Request, res: Response): void => {
  const id = +req.params.id

  const tour = tours.find((el) => el.id === id)
  res.status(200).json({
    status: 'success',
    data: { tour },
  })
}

export const createTour = (req: Request, res: Response): void => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = { id: newId, ...req.body }
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/../dev-dat/data/tours-simple.json`,
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

export const updateTour = (req: Request, res: Response): void => {
  res.status(200).json({
    data: {
      tour: '<Updata tour here ...>',
    },
  })
}

export const deleteTour = (req: Request, res: Response): void => {
  res.status(204).json({
    data: {
      status: 'success',
      data: null,
    },
  })
}
