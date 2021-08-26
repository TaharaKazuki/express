import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

type ResponseStatus = Response<any, Record<string, any>> | undefined

const tours = JSON.parse(
  `${fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)}`
)

export const checkID = (req:Request, res: Response, next: NextFunction) : ResponseStatus => {
  if(+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
 next()
}