import express from 'express'
const beneficial=express()
import {
    addBeneficial, 
    listBeneficials, 
    beneficialDetails, 
    listTakingUpRecords,
    listBeneficialsInMyRegion,
    reportBeneficial,
}from '../controllers/beneficialControllers'
import isAuthenticated from '../middlewares/Authorization'

beneficial.post('/addBeneficial',isAuthenticated, addBeneficial)
beneficial.get('/getBeneficials', listBeneficials)
beneficial.get('/getBeneficials/my-region', isAuthenticated, listBeneficialsInMyRegion)
beneficial.get('/beneficials/:beneficialId', beneficialDetails)
beneficial.get('/beneficials/:beneficialId/taking-up', listTakingUpRecords)
beneficial.put(
    '/beneficials/:beneficialId/report-use-abuse', 
    isAuthenticated, 
    reportBeneficial
)


module.exports={beneficial}