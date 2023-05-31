import express from 'express'
const beneficial=express()
import {addBeneficial, listBeneficials, beneficialDetails}from '../controllers/beneficialControllers'
import isAuthenticated from '../middlewares/Authorization'

beneficial.post('/addBeneficial',isAuthenticated, addBeneficial)
beneficial.get('/getBeneficials', listBeneficials)
beneficial.get('/beneficials/:beneficialId', beneficialDetails)


module.exports={beneficial}