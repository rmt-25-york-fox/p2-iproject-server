const { Movie, User, Genre, History } = require('../models')
class historyController {
  static async getHistories(req, res, next) {
    try {
      let histories = await History.findAll({
        include: [{ model: Movie, include: [User] }],
      })

      if (!histories) {
        next({ name: 'NotFound' })
      } else {
        res.status(200).json({
          statusCode: 200,
          data: histories,
        })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = historyController
