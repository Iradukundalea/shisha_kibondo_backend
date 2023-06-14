import { ipsconnected } from "./socket";
import NotificationService from "../service/notificationService";

export default async function sendNotification({ title, message, userIds }){
    for(let id of userIds){
        const notification = await NotificationService.createNotification({
            title,
            message,
            userId: id
        })

        for(let value in ipsconnected){
            if(ipsconnected[value].user.id === id)
                ipsconnected[value].socket.emit('notification', notification)
        }
    }
}
