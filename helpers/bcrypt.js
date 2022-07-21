const bcrypt = require("bcryptjs");

const hashPassword = (password, num) => {
  return bcrypt.hashSync(password, num);
};

const verifyPassword = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};

module.exports = { hashPassword, verifyPassword };
