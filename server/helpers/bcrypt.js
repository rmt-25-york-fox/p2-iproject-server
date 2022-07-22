const bcrypt = require("bcrypt");

function hash(pwd) {
  return bcrypt.hashSync(pwd, 10);
}

function compare(pwd, hashPwd) {
  return bcrypt.compareSync(pwd, hashPwd);
}

module.exports = { hash, compare };
