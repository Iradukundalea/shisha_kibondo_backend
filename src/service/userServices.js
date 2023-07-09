import { User, UserSession, beneficial } from '../models';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

  const userExist = async(email)=>{
    const user = await User.findOne({
      where: {email}
    })
    if(user){
      return user
    }
    return false
  }

  const phoneExist= async(telephone)=>{
    const userPhone=await User.findOne({
      where:{telephone}
    })
    if (userPhone){
      return true
    }
    return false
  }

  const createUser = async (userData)=>{
    userData.password = await bcrypt.hash(userData.password, 10)
    const user = await User.create(userData)
    return user;
  }

  const createUserSession = async({ userId, token, deviceType, loginIp, lastActivity })=> {
    const userSession = await UserSession.create({
      userId,
      token,
      loginIp,
      deviceType,
      lastActivity,
    });
    return userSession;
  }
  const deleteSession = async(sessionId, userId, token)=> {
    const searchQuery = sessionId ? { id: sessionId } : { userId, token };

    const userSession = UserSession.destroy({ where: searchQuery });
    return userSession;
  }

  const verifyUserAccount = async (email) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      if (user.isVerified) {
        throw new Error('User already verified');
      }
      user.isVerified = true;
      await user.save();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getUserSessions = async(token) =>{
    const sessions = await UserSession.findAll({
      where:{
        token
      }
    })
    return sessions
  }

  /**
   * @returns {array} All advisors found in my region 
   * (meaning having same province, district, sector, cell, and village as Mine)
   */
  const findAllAdvisorsInMyRegion = async (userId)=>{
    const currentUsetInfo = await User.findOne({ where: { id: userId}})
    const user = currentUsetInfo.get()
    console.log('currentUsetInfo', {
      province: user.province,
      district: user.district,
      sector: user.sector,
      cell: user.cell,
      village: user.village
    })
    const response = await User.findAll({ 
      where: { 
        id: {[Op.not]: userId }, 
        role: 'umujyanama wubuzima',
        province: user.province,
        district: user.district,
        sector: user.sector,
        cell: user.cell,
        village: user.village
      }
      })

    return response
    
  }

  /**
   * @params userId { string } - Beneficial Id
   * @returns { array } - All advisors operates in the region beneficial registered!
   */
  const getAdvisorsInBeneficialRegion = async (userId)=>{
    const currentUsetInfo = await beneficial.findOne({ where: { id: userId}})
    const user = currentUsetInfo.get()

    const response = await User.findAll({ 
      where: { 
        id: {[Op.not]: userId }, 
        role: 'umujyanama wubuzima',
        province: user.province,
        district: user.district,
        sector: user.sector,
        cell: user.cell,
        village: user.village
      }
      })

    return response
    
  }

  const getBeneficialsInAdvisorRegion = async (userId)=>{
    const currentUsetInfo = await User.findOne({ where: { id: userId }})
    const user = currentUsetInfo.get()
    console.log('currentUsetInfo', {
      province: user.province,
      district: user.district,
      sector: user.sector,
      cell: user.cell,
      village: user.village
    })
    const response = await beneficial.findAll({ 
      where: { 
        province: user.province,
        district: user.district,
        sector: user.sector,
        cell: user.cell,
        village: user.village
      }
      })

    return response
    
  }
 

  
export{
  userExist, 
  createUser, 
  phoneExist,
  verifyUserAccount,
  createUserSession,
  deleteSession,
  getUserSessions, 
  findAllAdvisorsInMyRegion,
  getAdvisorsInBeneficialRegion,
  getBeneficialsInAdvisorRegion
}