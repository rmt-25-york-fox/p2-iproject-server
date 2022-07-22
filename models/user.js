'use strict';
const { convertPhoneNumberID } = require('../helpers/preProcess');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Merchant, { through: 'Favorites' });
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: { msg: "Nama harus diisi" },
        notEmpty: { msg: "Nama harus diisi" },
      }
    },
    nickname:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Nomor handphone sudah terdaftar"
      },
      validate: {
        notNull: { msg: "Nomor handphone harus diisi" },
        notEmpty: { msg: "Nomor handphone harus diisi" },
      }
    },
    location:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: { msg: "Lokasi harus diisi" },
        notEmpty: { msg: "Lokasi harus diisi" },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Role harus diisi" },
        notEmpty: { msg: "Role harus diisi" },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.phoneNumber = convertPhoneNumberID(instance.phoneNumber);
      },
    },
  });
  return User;
};