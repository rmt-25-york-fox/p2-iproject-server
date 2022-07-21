const jwt = require("jsonwebtoken");
// console.log(process.env.SECRET_KEY);
const key = process.env.SECRET_KEY;
const signToken = (payload) => {
  return jwt.sign(payload, key);
};
const verifyToken = (token) => {
  return jwt.verify(token, key);
};
module.exports = { signToken, verifyToken };
