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
        const subscribed = await Subscription.findOne({where:{
            [Op.and]:[
                {
                    MemberId: req.user.id
                },
                {
                    PastorId: preach.Pastor.id
                }
            ]
        }})
        if(subscribed){
            throw ({message: "You already subscribed this Pastor"})
        }
        const subscription = await Subscription.create({MemberId: req.user.id, PastorId: preach.Pastor.id})

        res.status(201).json({message: "You have successfully subscribe the pastor, may God Bless You."})
    } catch (err) {
        next(err)
    }
}

static async subsList(req, res ,next){
    try {

        const subs = await Subscription.findAll(
            {
                where:{
                    MemberId: req.user.id
                },
                include: [{model:Pastor}],
            }
            )
            let pastorId = subs.map( el=>{
                return el.PastorId
            })

            let options = {
                where:{
                    [Op.or] : []
                 },
                order: [['date', 'DESC']]

            }

            for(let id of pastorId){
                options.where[Op.or].push({PastorId: id})
                console.log(id)
            }
            const preaches = await Preach.findAll(options)
        res.status(200).json(preaches)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

static async getPreachFromSublist(req,res,next){
    try {
        const {id} = req.params
        const preach = await Preach.findOne({where:{ id: +id }})
        console.log(preach);
            res.status(200).json(preach)
    } catch (err) {
        next(err)
    }
}

static async deleteSubscription(req,res,next){
    try {
        const {id} = req.params
        const preach = await Preach.findOne({where:{ id: +id }})
        console.log(preach);
        const subscription = await Subscription.destroy({where:{ PastorId: +preach.PastorId}})
        console.log(subscription)
            res.status(200).json({message:'Subscription has been Removed'})
    } catch (err) {
        next(err)
    }
}


}

module.exports = Controller