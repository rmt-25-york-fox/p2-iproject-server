const { Request,User } = require('../models')

class Requests {
    static async addRequest (req,res,next){
        try {
            const UserId = req.user.id
            const status = 'New'
            const { title,description,points } = req.body
            const resp = await Request.create({title,description,points,status,UserId})
            const checkPoint = await User.findOne({where:{id:UserId}})
            if(checkPoint.points < points) throw {name:'Insufficient points'}
            const decrease = await User.decrement({points:points},{where:{id:UserId}})
            res.status(201).json(
                resp
            )
        } catch (err) {
            next(err)
        }
    }
    static async getRequest (req,res,next){
        try {
            const resp = await Request.findAll({include:[User]})
            res.status(200).json(
                resp
            )
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = Requests