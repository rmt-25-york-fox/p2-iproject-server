const bcrypt = require("bcryptjs");

function hash(pwd) {
  return bcrypt.hashSync(pwd);
}

function compare(pwd, hashPwd) {
  return bcrypt.compareSync(pwd, hashPwd);
}

module.exports = { hash, compare };
