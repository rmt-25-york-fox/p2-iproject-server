const jwt = require("jsonwebtoken");

//process.env.SECRET_KEY tidak mau kebaca

const signPayload = (payload) => {
  return jwt.sign(payload, 'akusayangkamu');
};

const verifyToken = (token) => {
  return jwt.verify(token, 'akusayangkamu');
};

module.exports = { signPayload, verifyToken };
