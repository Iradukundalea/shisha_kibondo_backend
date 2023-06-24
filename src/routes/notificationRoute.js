const express=require('express')
const router = express.Router()
import isAuthenticated from '../middlewares/Authorization'  
import NotificationController from '../controllers/notificationControllers';   
 

router.get(
    '/notifications',
    isAuthenticated,
    NotificationController.listNotifications
)
router.patch(
    '/notifications/:notificationId/read',
    isAuthenticated,
    NotificationController.readNotification
)
router.patch(
    '/notifications/read-all',
    isAuthenticated,
    NotificationController.readAllNotifications
)

export default router

