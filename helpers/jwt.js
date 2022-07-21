const jwt = require('jsonwebtoken')

const signInToken = (payload) => {
    return jwt.sign(payload, 'secretCode');
};

const verifyToken = (token) => {
    return jwt.verify(token, 'secretCode');
};

module.exports = { signInToken,verifyToken };