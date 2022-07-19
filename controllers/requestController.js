const { Request,User } = require('../models')

class Requests {
    static async addRequest (req,res,next){
        try {
            const UserId = req.user.id
            const status = 'New'
            const { title,description,points } = req.body
            const resp = await Request.create({title,description,points,status,UserId})
            res.status(201).json(
                resp
            )
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = Requests