const {Preach} = require('../models')
class Controller{

    static async addPreach(req,res,next){
        try {
            const { title, date, VideoUrl} = req.body
            date =  date +" 04:00:00"
            const newPreach = await Preach.create({ title, date: date , VideoUrl, PastorId: req.user.id})
            res.status(201).json(newPreach)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = Controller