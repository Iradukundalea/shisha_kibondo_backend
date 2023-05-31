const { beneficial, User,Product_taken } = require('../models');

const addBeneficial = async (req, res) => {
  const {
    identityNumber,
    firstName,
    lastName, 
    telephone,
    sex,
    status,
    healthCenter,
    province,
    district,
    sector,
    cell,
    village
   
  } = req.body;
  const  nurseId = req.user.id

  try {
    const nurse = await User.findOne({ where: { id: nurseId } });
    if (!nurse) {
      return res.status(400).json({ message: 'You are not allowed to add a beneficiary.' });
    }
    const benef=await beneficial.findOne({where:{identityNumber}})
    if (benef) {
      return res.status(400).json({message:'beneficial already exist'})
    }
       const createdBeneficial = await beneficial.create({
      identityNumber,
      firstName,
      lastName,
      telephone,
      sex,
      status,
      healthCenter,
      province,
      district,
      sector,
      cell,
      village,
      nurseId
    });

    return res.status(200).json(createdBeneficial);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const listBeneficials = async (req, res) =>{
  try {
    const response = await beneficial.findAll()
    if(!response.length){
      return res.status(200).json({
        message: 'No beneficial records found at this moment.'
      });
    }
    return res.status(200).json({
      response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

const beneficialDetails = async (req, res) =>{
  const { beneficialId } = req.params

  const include = [
    {
      model: db.User,
      as: 'nurse',
      attributes: {exclude: ['password']}
    },
    {
      model: db.Guardian,
      as: 'guardians'
    }
  ]

  try {
    const response = await beneficial.findOne({ where: {id: beneficialId}, include})
    console.log('Details', response)
    if(!Object.keys(response).length){
      return res.status(200).json({
        message: 'Beneficial record not found.'
      });
    }
    return res.status(200).json({
      response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = { addBeneficial, listBeneficials, beneficialDetails };
