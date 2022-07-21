const bcrpyt = require("bcrypt");

function hashPass(password, option) {
  return bcrpyt.hashSync(password, option);
}

function comparePass(password, user) {
  return bcrpyt.compareSync(password, user);
}

module.exports = { hashPass, comparePass };
