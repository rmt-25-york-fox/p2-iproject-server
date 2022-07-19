const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const readPayload = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const getToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};
module.exports = { bcrypt, jwt, readPayload, getToken };
