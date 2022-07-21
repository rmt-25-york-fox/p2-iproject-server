const jwt = require("jsonwebtoken");
// const secretKey = process.env.SECRET_KEY;
const secretKey = "apaya";

function generateToken(payload) {
  const token = jwt.sign(payload, secretKey);
  return token;
}

function readToken(token) {
  const payload = jwt.verify(token, secretKey);
  return payload;
}

module.exports = { generateToken, readToken };
