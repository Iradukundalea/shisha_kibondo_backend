import db from "../models";
import { getAdvisorsInBeneficialRegion } from '../service/userServices'
import { sendSMS } from '../helpers/sendSMS'
import BeneficialService from '../service/beneficialService'

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
            return res.status(500).json({ error })
        }
    }
}
