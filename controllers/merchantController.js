const { User, Merchant, Favorite } = require('../models');


const getJunctionTable = async (req, res, next) => {
  try {
    const junctionTable = await Favorite.findAll({
      include: [ User, Merchant ],
    });

    res.status(200).json(junctionTable);
    
  } catch (err) {
    next(err);
  }
}

module.exports = { getJunctionTable };