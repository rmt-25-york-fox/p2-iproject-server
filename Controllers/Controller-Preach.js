const {Preach} = require('../models')
class Controller{

    static async addPreach(req,res,next){
        try {
            const { title, date, VideoUrl} = req.body
           let convertedDate = Date.parse(date)

            const newPreach = await Preach.create({ title, date: convertedDate , VideoUrl, PastorId: req.user.id})
            if(!newPreach){
                throw err
            }
            res.status(201).json(newPreach)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = Controller