import fs from 'fs'

const tours = JSON.parse(
  `${fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)}`
)