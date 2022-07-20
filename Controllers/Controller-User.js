
const { Pastor, Member} = require('../models')
const {createToken, verifyToken} = require('../Helpers/jwtHelper')
class Controller {
    static async registerMember(req,res,next){
        try {
            const {name, email , password} = req.body

            const newMember = await Member.create({name , email, password})
            const payload = {
                id: newMember.id
            }
            const token = createToken(payload)

            res.status(201).json({
                access_token: token,
                name: newMember.name
            })
            
        } catch (err) {
            next(err)
        }
    }
}


module.exports = Controller