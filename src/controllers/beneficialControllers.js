const { beneficial, User } = require('../models');

const addBeneficial = async (req, res) => {
  const {
    identityNumber,
    firstName,
    lastName, 
    telephone,
    type,
    status,
    healthCenter,
    province,
    district,
    sector,
    cell,
    village,
    nurseId
  } = req.body;

  try {
    const nurse = await User.findOne({ where: { id: nurseId } });
    if (!nurse) {
      return res.status(400).json({ message: 'You are not allowed to add a beneficiary.' });
    }

    const createdBeneficial = await beneficial.create({
      identityNumber,
      firstName,
      lastName,
      telephone,
      type,
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

module.exports = { addBeneficial };
