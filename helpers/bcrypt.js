const bcrypt = require("bcryptjs");

function bcryptHash(password, value) {
  const hash = bcrypt.hashSync(password, value);
  return hash;
}

function bcryptCompare(password, UserPassword) {
  const compare = bcrypt.compareSync(password, UserPassword);
  return compare;
}

module.exports = { bcryptHash, bcryptCompare };
