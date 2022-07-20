'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
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
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};