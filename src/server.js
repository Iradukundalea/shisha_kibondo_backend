import express from'express'
const app=express()
import authRoute from'./routes/authRoutes'
import {beneficial} from './routes/beneficialRoute'
import {guardian} from './routes/guardianRoute'

import swaggerUI from'swagger-ui-express'
import swaggerDocs from'./documentation'
import cors from 'cors'

var bodyParser = require('body-parser');

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





app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT=process.env.PORT|| 4000

app.listen(PORT,()=>{
    console.log(`server connected on ${PORT}` );
})