import { Router } from 'express'
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} from './../controllers/tourController'

const router = Router()

router.param('id', checkID)
router.route('/').get(getAllTours).post(checkBody, createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

export default router
