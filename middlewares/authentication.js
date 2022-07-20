const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    console.log(access_token);
    const decoded = verifyToken(access_token);

    console.log(decoded);

    const user = await User.findOne({ where: { email: decoded.email } });

    console.log(user);

    if (!user) {
      next({ name: "Unauthorized" });
    } else {
      console.log("ELSE");
      req.user = {
        id: user.id,
        email: user.email,

        name: user.name,
      };

      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
