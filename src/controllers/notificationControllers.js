import db from "../models";

export default class NotificationController {
    static async listNotifications(req, res) {
        const { id: userId } = req.user
        const response = await db.Notifications.findAll({ where: { userId }})
        return res.status(200).json({ response })
    }
}
