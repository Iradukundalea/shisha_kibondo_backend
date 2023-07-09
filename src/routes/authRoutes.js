const express=require('express')
const router=express.Router()
const usercont=require('../controllers/authocontroller')

import AuthValidation from '../validationSchema/validation';
const passwd=require('../controllers/forgotPassword')
import checkVerify from '../middlewares/checkverify'
import isAuthenticated from '../middlewares/Authorization'
import isAdmin from '../middlewares/isAdmin'   
import advisorController from '../controllers/advisorControllers'    
 

router.post(
    '/signup/nurse', 
    isAuthenticated, 
    isAdmin, 
    AuthValidation.verifySignup, 
    usercont.addNurse
)

router.post(
    '/signup/advisor', 
    isAuthenticated, 
    isAdmin, 
    AuthValidation.verifySignup, 
    usercont.addAdvisor
)

router.post('/login', checkVerify, usercont.login)
router.post("/signout", isAuthenticated, usercont.signout);

router.get('/users', usercont.getUser)


router.get('/verify/:token', usercont.verifyUser)

router.post(
    '/forgot-password',
    passwd.requestResetPassword
)
router.post('/reset-password/:token', passwd.resetPassword)
router.get('/reset-password/:token', passwd.getResetPassword)
router.get('/Number_of_users', usercont.countUsers)

router.get('/list-advisors', isAuthenticated, isAdmin, advisorController.getAllAdvisors)
router.get('/list-advisors/my-region', isAuthenticated, advisorController.getAllAdvisorsInMyRegion)

router.get('/list-nurses', isAuthenticated, isAdmin, usercont.listNurses)



module.exports = router
