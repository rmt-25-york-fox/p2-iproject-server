const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try{
    const { access_token } = req.headers;
    
    if(!access_token)
      throw { name: 'Forbidden' }
    
    const decoded = verifyToken(access_token);

    const user = await User.findOne({ 
      where: {
        phoneNumber: decoded.phoneNumber,
      },
    });

    if(!user)
      throw { name: 'Unauthorized' }

    req.user = {
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    }

    next();
  } catch(err) {
    // console.log(err);
    next(err);
  }
}

module.exports = authentication;