
  const {User,doctors,medical_consultation}=require("../models")
  const assignToken =require( '../helpers/assignToken');
  const verifyToken =require( '../helpers/verifyToken');
  import sendVerificationEmail from '../helpers/sendEmail/sendVerificationEmail';

  require('dotenv').config();

  const { phoneExist, userExist,createUser,verifyUserAccount,createUserSession,deleteSession } =require('../service/userServices');
  const bcrypt=require( 'bcrypt');



  // signup/nurse

  const addNurse=async(req,res)=>{
      const{firstName,lastName,sex,degree,email,telephone,password,specialized}=req.body

      req.body.role = 'Nurse'
    
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
    

  //   login
    const login = async (req, res) => {
      const {email} = req.body
      try {
        const user = await userExist(email)
        if (!user) {
          return res.status(404).json({ message: "User Not found." });
        }
        
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!",
          });
        }
        const loginToken = assignToken(user)
        const ssn = await createUserSession({
          userId: user.id,
          token:loginToken,
          deviceType: req.headers["user-agent"],
          loginIp: req.ip,
          lastActivity: new Date().toJSON(),
        });
        
        return res.status(200).json({
          loginToken,
          ssn
        }); 
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
// logout
    const  signout = async(req, res)=> {
      try {
        if (!req.user || !req.headers["authorization"]) {
          return res.status(403).json({ message: 'user not logged in' });
        }
    
        const token = req.headers["authorization"].split(" ")[1];
        await deleteSession(null, req.user.id, token);
        return res.status(200).json({ message: 'logged out successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'unable to logout' });
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
  const verifyUser = async(req, res)=> {
    let data = {};
    
    try {
      data = await verifyToken(req.params.token);
    } catch (err) {
      return res.status(400).json(err.message);
    }
    try {
      const verified = await verifyUserAccount(data.user.email);
      if(verified){      
        return res.status(200).json({status: 200, message: "User verfied"});
      }
    } catch (error) {
      return res.status(500).json({message: `Ooops! Unable to verify User ${error.message}`});
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
const countUsers = async (req, res) => {
  try {
    const count = await User.count();
    return res.json({ count });
  } catch (error) {
    return res.json({ message: 'Unable to count users', error });
  }
};


  module.exports={addNurse,addAdvisor,login,getUser,verifyUser,getAllDoctors,countUsers,signout}