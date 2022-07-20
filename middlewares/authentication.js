const { verifyToken } = require("../helpers/helpers.js");
const { User } = require("../models/");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decode = verifyToken(access_token);

    const user = await User.findOne({ where: { email: decode.email } });
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
