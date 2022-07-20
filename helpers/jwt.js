const jwt = require("jsonwebtoken");

//process.env.SECRET_KEY tidak mau kebaca

const signPayload = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { signPayload, verifyToken };
