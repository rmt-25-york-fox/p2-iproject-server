const { User } = require('../models')

class Users {
    static async regis (req,res,next){
        try {
        const role = 'Customer'
        const points = 200
        const {name,email,password,phoneNumber,address} = req.body
        const resp = await User.create({name,email,password,phoneNumber,address,points,role})
        res.status(201).json({
            id:resp.id,
            email:resp.email
        })
        } catch (err) {
            next(err)            
        }
    }
}

module.exports = Users