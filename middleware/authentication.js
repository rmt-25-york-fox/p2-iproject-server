const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/')

const authenticate = async (req,res,next) =>{
    try {
        const { access_token } = req.headers
        if(!access_token) throw {name: 'Unauthorized'}
        const decode = verifyToken(access_token)
        const resp = await User.findOne({where:{email:decode}})
        if (!resp) throw {name: 'Unauthorized'}
        req.user = {
            id:resp.id
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authenticate
