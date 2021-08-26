import { Router } from 'express'
import {
  getAllUsers,
  getUser,
  updateUser,
  createUsers,
  deleteUser,
} from './../controllers/userController'

const router = Router()

router.route('/').get(getAllUsers).post(createUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
