const {Preach, Pastor, Subscription} = require('../models')
const { Op} = require('sequelize')

class Controller {
static async createSubcription (req,res, next){
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

        const subscription = await Subscription.create({MemberId: req.user.id, PastorId: preach.Pastor.id})

        res.status(201).json({message: "You have successfully subscribe the pastor, may God Bless You."})
    } catch (err) {
        next(err)
    }
}
}

module.exports = Controller