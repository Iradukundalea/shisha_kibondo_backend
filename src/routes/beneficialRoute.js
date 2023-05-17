import express from 'express'
const beneficial=express()
import {addBeneficial}from '../controllers/beneficialControllers'
import isAuthenticated from '../middlewares/Authorization'





beneficial.post('/addBeneficial', addBeneficial)


module.exports={beneficial}