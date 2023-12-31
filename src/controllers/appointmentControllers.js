import db from "../models";
import { getAdvisorsInBeneficialRegion } from '../service/userServices'
import { sendSMS } from '../helpers/sendSMS'
import BeneficialService from '../service/beneficialService'
import AppointmentService from '../service/appointmentService'
import { reminderJob } from '../helpers/appointment/reminderJob'
export default class AppointmentController {
    static async getBeneficiaryAppointments(req, res) {
        const { beneficialId } = req.params

        const include = {
            model: db.beneficial,
            as: 'beneficial'
        }

        const response = await db.Appointment.findAll({ where: { beneficialId }, include})
        if(!response.length){
            return res.status(200).json({ message: 'No appointments found at this moment.' })
        }
        return res.status(200).json({ response })
    }

    static async assignAppointment(req, res) {
        const { beneficialId } = req.params
        const { id : nurseId } = req.user
        const { appointmentDate } = req.body

        try{
            // check current logged in user if s/he is a nurse
            const nurse = await db.User.findOne({ where: { id: nurseId } });
            if (!nurse) {
                return res.status(400).json({ message: 'You are not allowed to assign appointment to beneficiary, only nurse.' });
            }

            // check if there is another scheduled appointment
            const existAppointment = await db.Appointment.findOne({ where: { beneficialId, status: 'scheduled'}})
            if(existAppointment){
                return res.status(409).json({ message: 'Already has a scheduled appointment!'})
            }

            if(nurseId && beneficialId && appointmentDate){
                // schedule the appointment
                const response = await db.Appointment.create({
                    nurseId,
                    beneficialId,
                    appointmentDate
                })
    
                // format a date
                const formattedDate = new Date(appointmentDate).toLocaleDateString()

                // SMS notification to beneficial and advisors
                const details = await BeneficialService.getBeneficialDetails(beneficialId)
                const message = `Appointment to pick SHISHAKIBONDO scheduled to ${details.firstName} ${details.lastName} at ${formattedDate} so keep following.`
                sendSMS(`${details.telephone}`, message)

                const advisors = await getAdvisorsInBeneficialRegion(beneficialId)
                for(let advisor of advisors){
                    sendSMS(`${advisor.telephone}`, message)
                }
                return res.status(201).json({ response })
    
            }
            return res.status(400).json({ error: 'Please provided needed parameters.' })

        }catch(error){
            return res.status(500).json({ error: error.message })
        }
    }

     static async getAllAppointmentsByAdmin(req, res) {
        const include = {
            model: db.beneficial,
            as: 'beneficial'
        }

        const response = await db.Appointment.findAll({ include })
        if(!response.length){
            return res.status(200).json({ message: 'No appointments found at this moment.' })
        }
        return res.status(200).json({ response })
    }

    static async updateAppointmentStatus(req, res){
        const { appointmentId } = req.params
        const { status } = req.body
        const { id: nurseId } = req.user

        try{
            // check current logged in user if s/he is a nurse
            const nurse = await db.User.findOne({ where: { id: nurseId } });
            if (!nurse) {
                return res.status(400).json({ message: 'You are not allowed to assign appointment to beneficiary, only nurse.' });
            }

            const response  = await db.Appointment.findOne({where: { id:appointmentId }})
            if(!Object.keys(response).length){
                return res.status(404).json({
                    error: 'Appointment to change status not found!'
                })
            }

            let appointmentTimestamp = new Date(response.appointmentDate).getTime()
            let timeStamp = new Date().getTime()
            if(status === 'obeyed'){
                appointmentTimestamp = new Date(response.appointmentDate).getTime()
                    timeStamp = new Date().getTime()
                    if(appointmentTimestamp < timeStamp){
                        return res.status(400).json({
                            message: 'Appointment date is a wayback to today, so can not be obeyed now! '
                        })
                    }
            }

            // change the status
            response.update({ status })
            
            return res.status(200).json({
                response,
            })
        } catch(error){
            return res.status(500).json({
                error,
            })
        }
    }

    static async AppointmentReminders(req, res) {
        const include = {
            model: db.beneficial,
            as: 'beneficial'
        }

        reminderJob.start()

        const response = await AppointmentService.setReminder()
        if(!response.length){
            return res.status(200).json({ message: 'No appointments found at this moment.' })
        }
        return res.status(200).json({ reminder: response })
    }
}
