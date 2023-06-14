const express=require('express')
const router = express.Router()
import isAuthenticated from '../middlewares/Authorization'  
import NotificationController from '../controllers/notificationControllers';   
 

router.get(
    '/notifications',
    isAuthenticated,
    NotificationController.listNotifications
)

export default router

