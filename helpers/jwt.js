const jwt = require('jsonwebtoken')

const signInToken = (payload) => {
    return jwt.sign(payload, 'secretCode');
};

module.exports = { signInToken };