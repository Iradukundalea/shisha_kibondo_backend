
const {User,doctors,medical_consultation}=require("../models")
const assignToken =require( '../helpers/assignToken');
const verifyToken =require( '../helpers/verifyToken');
import sendVerificationEmail from '../helpers/sendEmail/sendVerificationEmail';
import { findAllAdvisorsInMyRegion } from '../service/userServices'
import { Op } from 'sequelize';

require('dotenv').config();

const { phoneExist, userExist,createUser,verifyUserAccount,createUserSession,deleteSession } =require('../service/userServices');
const bcrypt=require( 'bcrypt');
export default class AdvisorController{

    static async getAllAdvisors(req, res){
        const where = {
            role: 'umujyanama wubuzima'
        }

        const response = await User.findAll({
            where
        })

        // remove password to response
        for(let respData of response){
            delete respData.get().password
        }

        if(!response.length){
            return res.status(200).json({
                message: 'Currently, no advisor found!'
            })
        }

        return res.status(200).json({
            response
        })
    }

    static async getAllAdvisorsInMyRegion(req, res){
        const response = await findAllAdvisorsInMyRegion(req.user.id)
        
        // remove password to response
        for(let respData of response){
            delete respData.get().password
        }

        if(!response.length){
            return res.status(200).json({
                message: `Currently, no advisor found in your region: ${req.user.province}, ${ req.user.district}, ${ req.user.sector}, ${ req.user.cell}, ${ req.user.village}!`
            })
        }

        return res.status(200).json({
            response
        })
    }
}

// signup/umujyanama wubuzima

const addAdvisor=async(req,res)=>{
  const{firstName,lastName,sex,degree,email,telephone,password,specialized}=req.body

  req.body.role = 'umujyanama wubuzima'

  try{ 
      const user = await userExist(email)
  if(user){
    return res.json({success: false, statusCode: 409, message: 'email already exists'})
  }
  const puser= await phoneExist(telephone)
  if(puser){
    return res.json({success: false, statusCode: 409, message: 'phone already exist'})
  }
  const newUser = await createUser(req.body)

  if(newUser){
      const userToken = assignToken(user)
      sendVerificationEmail(userToken, newUser)

      return res.status(201).json({success:true,statusCode:201,regToken: userToken,data: newUser
      });
      
    }

    } catch (error) {
      return res.json({success: false, statusCode: 500, error: error.message, message:'Internal server error'})
    }
    
  }

const getUser = async(req,res)=>{
  try{
      const users=await User.findAll()
          return res.json(users)
      }

      catch(err){
          console.log(err)
          return res.status(500).json({error:err.message})
      }
}


const getAllDoctors = async(req,res)=>{
  try{
      const doctor=await doctors.findAll({include:[medical_consultation]})
          return res.json(doctor)
      }

      catch(err){
          console.log(err)
          return res.status(500).json({error:err.message})
      }
}



// module.exports={addNurse,addAdvisor,login,getUser,verifyUser,getAllDoctors,countUsers,signout}
