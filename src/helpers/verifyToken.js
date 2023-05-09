const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.SECRETKEY);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports=verifyToken