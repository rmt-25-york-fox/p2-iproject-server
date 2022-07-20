const jwt = require('jsonwebtoken')

const createToken = (payload) =>{
    return jwt.sign(payload, "key-ngasal", {
        expiresIn : "1h"
    })
}

const verifyToken = (token) =>{
    return jwt.verify(token)
}

module.exports = {createToken, verifyToken}