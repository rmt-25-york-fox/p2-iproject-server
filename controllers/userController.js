const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { convertPhoneNumberID } = require('../helpers/preProcess');
const axios = require('axios');

const register = async (req, res, next) => {
  try{
    const { phoneNumber, role } = req.body;

    let convertedPhoneNumber = convertPhoneNumberID(phoneNumber);

    const response = await axios.get(`https://phonevalidation.abstractapi.com/v1/
    ?api_key=e3ceeff909a744838fd7fb5a8d73ff20&phone=${convertedPhoneNumber}`)

    const user = await User.create({
      fullName: 'Dummy',
      nickname: 'Dummy', 
      phoneNumber: convertedPhoneNumber,
      location: 'Dummy',
      role,
    });
    
    res.status(201).json({ 
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });

  } catch (err) {
    if(err.response.status == 404)
      err.name = "Nomor handphone tidak sesuai"
    
    next(err);
  }
}

const login = async (req, res, next) => {
  try{
    const { phoneNumber } = req.body;
    
    if(!phoneNumber)
      throw { name: 'Nomor handphone harus diisi' };

    let convertedPhoneNumber = convertPhoneNumberID(phoneNumber);

    const user = await User.findOne({
      where: {
        phoneNumber: convertedPhoneNumber
      }
    });

    if(!user)
      throw { name: 'Data tidak ditemukan' };

    // if(!comparePassword(password, user.password))
    //   throw { name: 'Invalid username or email or password' };
    
    const access_token = signToken({
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
    
    res.status(200).json({
      access_token: access_token,
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });

  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };