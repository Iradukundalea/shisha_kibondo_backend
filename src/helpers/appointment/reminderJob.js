const nodeCron = require("node-cron");
import db from "../../models"

import AppointmentService from '../../service/appointmentService'
import { sendSMS } from '../../helpers/sendSMS'

const reminderJob = nodeCron.schedule(
  "25 17 * * *", // Run at 2:05 PM every day
  async function jobYouNeedToExecute() {
    try {
      const beReminded = await AppointmentService.setReminder();
      if (beReminded.length > 0) {
        for( let remid of beReminded){
          console.log("Appointments to be reminded:", remid);
          if(remid.beneficial.telephone){
            // Reminder to beneficial
            sendSMS(
              `${remid.beneficial.telephone}`, 
              `Remember you have an appointment on ${remid.appointmentDate} to pick your shishakibondo.`
            )
          }
        }
        // Perform other actions here
      }else{
        console.log("NO ONE TO REMIND ABOUT HIS APPOINTMENT (BENEFICIAL):");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
);

module.exports = reminderJob;
