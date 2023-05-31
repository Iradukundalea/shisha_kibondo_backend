const { beneficial, User,Guardian } = require('../models');

const addGuardian = async (req, res) => {
  const {
    identityNumber,
    firstName,
    lastName,
    telephone,  
    sex,
    province,
    district,
    sector,
    cell,
    village
   
  } = req.body;
  const { beneficialId } = req.params
  const  nurseId = req.user.id

  const condition = {
    id: nurseId,
    role: 'Nurse'
  }
  try {
    const nurse = await User.findOne({ where: condition });
    if (!nurse) {
      return res.status(400).json({ message: 'You are not allowed to add a guardian, Only Nurse' });
    }
    const benef=await Guardian.findOne({where: { identityNumber }})
    if (benef) {
      return res.status(400).json({message:'guardian already exist'})
    }
       const createdBeneficial = await Guardian.create({
        identityNumber,
        firstName,
        lastName, 
        telephone,  
        sex,
        province,
        district,
        sector,
        cell,
        village,
        beneficialId,
        nurseId
    });

    return res.status(200).json(createdBeneficial);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { addGuardian };
