import db from "../models"

export default class AppointmentService {
    static async setReminder() {
        const include = [
            {
                model: db.beneficial,
                as: 'beneficial'
            }
        ]
        const appointments = await db.Appointment.findAll({include});

        const twoDaysAhead = new Date();
        twoDaysAhead.setDate(twoDaysAhead.getDate() + 2);
      
        const beReminded = appointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.appointmentDate);
          const timeDiff = appointmentDate.getTime() - twoDaysAhead.getTime();
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          return daysDiff >= 0;
        //   return daysDiff ;  // TWEAK TO IT DURING TESTING
        });
        return beReminded;
    }

    
}
