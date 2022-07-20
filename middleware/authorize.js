const { SpaceShuttle } = require("../models");

const authorize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await SpaceShuttle.findByPk(id);
    if (!data) {
      throw { name: "NotFound" };
    }

    if (data.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorize;
