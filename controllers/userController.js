const { checkPassword } = require('../helpers/bcrypt')
const { signInToken } = require('../helpers/jwt')
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
    static async login (req,res,next){
        try {
            const {email,password} = req.body
            if(!email || !password) throw {name:'Email and password is required'}
            const resp = await User.findOne({where:{email}})
            if(!resp) throw {name:'Invalid email or password'}
            if(!checkPassword(password,resp.password)) throw {name:'Invalid email or password'}
            const access_token = signInToken(resp.email)
            res.status(200).json({
                access_token
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Users