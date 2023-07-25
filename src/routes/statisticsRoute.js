import { Router } from 'express'
import isAuthenticated from '../middlewares/Authorization'
import statisticsController from '../controllers/statisticsController'

const statistics = Router()

statistics.get('/statistics', statisticsController.getAllUsers)

export default statistics
