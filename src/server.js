import express from'express'
import authRoute from'./routes/authRoutes'
import { beneficial } from './routes/beneficialRoute'
import { guardian } from './routes/guardianRoute'
import { product } from './routes/productRoute'
import notification from './routes/notificationRoute'
import appointmentRoute from './routes/appointmentRoute'

import swaggerUI from'swagger-ui-express'
import swaggerDocs from'./documentation'
import cors from 'cors'
import io from './utils/socket'
import path from 'path'
const nodeCron = require("node-cron");
import AppointmentService from './service/appointmentService'
const reminderJob =require('./helpers/appointment/reminderJob')

const app=express()

var bodyParser = require('body-parser');
// Serve the static files from the Vite build output directory
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

var bodyParser = require('body-parser')
require('dotenv/config');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use('/api',authRoute)
app.use('/api',beneficial)
app.use('/api',guardian)
app.use('/api', product)
app.use('/api', notification)
app.use('/api', appointmentRoute)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = process.env.PORT || 4000

export const server = app.listen(PORT, ()=>{
    console.log(`server connected on http://localhost:${PORT}` );
})

// const reminderJob = nodeCron.schedule(
//     "* * * * * *",  
//     async function jobYouNeedToExecute() {
//         const beReminded = await AppointmentService.setReminder(); // Replace YourClass with the appropriate class or function name
//         if (beReminded.length > 0) {
//           // Do whatever you want when there are appointments to be reminded
//           console.log("Appointments to be reminded:", beReminded);
//           // Send email, make database backup, or perform other actions
//         }
//         console.log(new Date().toLocaleString());
//       },{
//         scheduled: false
//       }
    
// );

// reminderJob.start()

// Start the cron job
reminderJob.start();

io.attach(server)
