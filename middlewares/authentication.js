const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decoded = verifyToken(access_token);

    const findUser = await User.findOne({
      where: {
        email: decoded.email,
      },
    });
    if (!findUser) {
      throw { name: "USER_NOT_FOUND" };
    }
    req.findUser = {
      id: findUser.id,
      email: findUser.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
