import db from "../models"

export default class NotificationService {
    static async createNotification({ title, message, userId}){
        const notification = await db.Notifications.create({
            title,
            message,
            userId
        })
        return notification
    }
}
