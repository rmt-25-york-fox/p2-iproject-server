const {Preach, Pastor} = require('../models')
const { Op} = require('sequelize')
class Controller{
    static async preachList(req,res, next){
        try {

            let options = {
                include: [
                    {
                        model: Pastor
                    }
                ],
                where: {
                    date:{
                        [Op.lte]: new Date()
                    }

                }
            }
            const { PastorId } = req.query

            if(PastorId){
                options.include[0].where = { id: +PastorId}
              }

            const preaches = await Preach.findAll(options)

            res.status(200).json(preaches)
        } catch (err) {
            next(err)
        }
    }
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