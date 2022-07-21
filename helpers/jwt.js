const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function signJwt(payload) {
  return jwt.sign(payload, secretKey);
}

function verifyJwt(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { signJwt, verifyJwt };
