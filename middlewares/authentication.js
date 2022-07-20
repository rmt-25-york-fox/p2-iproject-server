const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    const decoded = verifyToken(access_token)

    const user = await User.findOne({ where: { email: decoded.email } })

    if (!user) {
      next({ name: 'Unauthorized' })
    } else {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      }

      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
