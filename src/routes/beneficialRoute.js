import express from 'express'
const beneficial=express()
import {addBeneficial, listBeneficials}from '../controllers/beneficialControllers'
import isAuthenticated from '../middlewares/Authorization'

beneficial.post('/addBeneficial',isAuthenticated, addBeneficial)
beneficial.get('/getBeneficials', listBeneficials)


module.exports={beneficial}