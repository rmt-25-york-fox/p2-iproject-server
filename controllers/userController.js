const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

const register = async (req, res, next) => {
  try{
    const { fullName, nickname, phoneNumber, location } = req.body;
    const user = await User.create({
      fullName: 'Dummy',
      nickname: 'Dummy', 
      phoneNumber, 
      location: 'Dummy'
    });
    
    res.status(201).json({ 
      id: user.id,
      email: user.phoneNumber,
    });

  } catch (err) {
    next(err);
  }
}

const login = async (req, res, next) => {
  try{
    const { phoneNumber } = req.body;
    
    if(!phoneNumber)
      throw { name: 'Nomor handphone harus diisi' };

    const user = await User.findOne({
      where: {
        phoneNumber: phoneNumber
      }
    });

    if(!user)
      throw { name: 'Data tidak ditemukan' };

    // if(!comparePassword(password, user.password))
    //   throw { name: 'Invalid username or email or password' };
    
    const access_token = signToken({
      id: user.id,
      email: user.email
    });
    
    res.status(200).json({
      statusCpde: 200,
      access_token: access_token,
      id: user.id,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };