import express from 'express'
const beneficial=express()
import {addBeneficial, listBeneficials, beneficialDetails, listTakingUpRecords}from '../controllers/beneficialControllers'
import isAuthenticated from '../middlewares/Authorization'

beneficial.post('/addBeneficial',isAuthenticated, addBeneficial)
beneficial.get('/getBeneficials', listBeneficials)
beneficial.get('/beneficials/:beneficialId', beneficialDetails)
beneficial.get('/beneficials/:beneficialId/taking-up', listTakingUpRecords)


module.exports={beneficial}