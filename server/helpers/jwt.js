const jwt = require("jsonwebtoken");
const key = process.env.TOKEN_KEY;

function payloadToToken(payload) {
  return jwt.sign(payload, key, { expiresIn: "7d" });
}

function tokenToPayload(token) {
  return jwt.verify(token, key);
}

module.exports = { payloadToToken, tokenToPayload };
