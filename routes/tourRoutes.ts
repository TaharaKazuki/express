import express, { Router } from 'express'
import tourController from './../controllers/tourController'

const router = Router()

router.param('id', tourController.checkID)
