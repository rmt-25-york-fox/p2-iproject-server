const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function signToken(payload) {
  return jwt.sign(payload, "SECRET_KEY");
}

function verify(payload) {
  return jwt.verify(payload, "SECRET_KEY");
}

function hashPassword(password) {
  return bcrypt.hashSync(password);
}

function compareHash(rawPass, password) {
  return bcrypt.compareSync(rawPass, password);
}

module.exports = {
  signToken,
  verify,
  hashPassword,
  compareHash,
};
