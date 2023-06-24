import db from "../models";

export default class NotificationController {
    static async listNotifications(req, res) {
        const { id: userId } = req.user
        const response = await db.Notifications.findAll({ where: { userId }})
        return res.status(200).json({ response })
    }

    static async readNotification(req, res) {
        const { id: userId } = req.user
        const { notificationId } = req.params
        const response = await db.Notifications.findOne({ where: { id: notificationId,  userId }})
        if(!Object.keys(response).length){
            return res.status(404).json({ error: 'Notification not found' })
        }

        // change status -> read
        await response.update({
            status: 'read'
        })
        return res.status(200).json({ response })
    }

    static async readAllNotifications(req, res) {
        const { id: userId } = req.user
        
        const response = await db.Notifications.findAll({ where: { userId, status: 'delivered' }})

        // change status of every notification -> read
        for(let notification of response){
            await notification.update({
                status: 'read'
            })
        }

        return res.status(200).json({ response })
    }
}
