const jwt = require( 'jsonwebtoken');

const assignToken = (user) =>{
    const token=jwt.sign({user}, process.env.SECRETKEY, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });
      return token;
}

module.exports= assignToken
