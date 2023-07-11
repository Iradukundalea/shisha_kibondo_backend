import { Router } from 'express'
import AppointmentController from '../controllers/appointmentControllers'
import isAuthenticated from '../middlewares/Authorization'

const appointment = Router()

appointment.get(
    '/appointments/:beneficialId/list', 
    AppointmentController.getBeneficiaryAppointments
)

appointment.post(
    '/appointments/:beneficialId/create', 
    isAuthenticated,
    AppointmentController.assignAppointment
)

appointment.get(
    '/appointments', 
    AppointmentController.getAllAppointmentsByAdmin
)

export default appointment
