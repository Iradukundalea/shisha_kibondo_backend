import express from 'express'
const guardian=express()
import {addGuardian}from '../controllers/guardianController'
import isAuthenticated from '../middlewares/Authorization'

guardian.post('/beneficials/:beneficialId/addGuardian', isAuthenticated, addGuardian)


module.exports={guardian}