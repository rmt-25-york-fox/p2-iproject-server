const { User } = require("../models");
const { readToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decoded = readToken(access_token);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
