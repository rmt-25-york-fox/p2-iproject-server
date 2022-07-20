const bcrypt = require("bcryptjs");

const hashPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, 8);
};

const comparePassword = (rawPassword, hashPassword) => {
  return bcrypt.compareSync(rawPassword, hashPassword);
};

module.exports = { hashPassword, comparePassword };
