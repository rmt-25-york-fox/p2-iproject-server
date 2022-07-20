'use strict';
const {
  Model
} = require('sequelize');

import axios from 'axios'

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    displayPic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', async (newUser)=>{
    try {
      const pic = await axios.get('https://xsgames.co/randomusers/avatar.php?g=pixel')
      newUser.displayPic = pic
    } catch (error) {
      console.log(error)
    }
  })

  return User;
};