import db from "../models"

export default class SMSServices {
    static async createSMS({ messageid, receipient, message, time, totalmessages, status}){
        const sms = await db.SMS.create({
            messageid,
            receipient,
            message,
            time,
            totalmessages,
            status
        })
        return sms
    }
}
