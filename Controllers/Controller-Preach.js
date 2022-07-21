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

                },
                 order: [['date', 'DESC']]
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

    static async personalPreachList(req , res , next){
        try {
            let options = {
                include: [
                    {
                        model: Pastor
                    }
                ],
                where:{
                    PastorId: req.user.id
                },

                 order: [['date', 'DESC']]
            }





            const preaches = await Preach.findAll(options)

            res.status(200).json(preaches)
        } catch (err) {
            next(err)
        }
    }
    static async getUpdatePreach(req, res , next){
        try {

            const {id} = req.params
            console.log(id)
            const preach = await Preach.findOne({where:{
                id: +id
            }})
            res.status(200).json(preach)
        } catch (err) {
            next(err)
        }
    }
    
    static async patchUpdatePreach(req, res , next){
        try {

            const {id} = req.params
            const {title, VideoUrl, date} = req.body
           let convertedDate = Date.parse(date)

            console.log(id, "<><><><><><>", {title, VideoUrl, date})
            const preach = await Preach.update({title, VideoUrl, date: convertedDate},{where:{
                id: +id
            }})
            res.status(201).json({message: 'Your data is updated'})
        } catch (err) {
            next(err)
        }
    }

    static async preachById(req , res, next){
        try {
            const {id} = req.params
            const preach = await Preach.findOne({
                include: {
                    model: Pastor
                }
                ,
                where:{
                     id: +id
                    }
            })

            res.status(200).json(preach)
        } catch (err) {
            
        }
    }
}
module.exports = Controller