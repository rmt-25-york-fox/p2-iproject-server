
const { Pastor, Member} = require('../models')
const {createToken, verifyToken} = require('../Helpers/jwtHelper')
const { comparePassword } = require('../Helpers/brcyptHelper')
class Controller {
    static async registerMember(req,res,next){
        try {
            const {name, email , password} = req.body

            const newMember = await Member.create({name , email, password})
            const payload = {
                id: newMember.id,
                email: newMember.email

            }
            const token = createToken(payload)

            res.status(201).json({
                access_token: token,
                name: newMember.name,
                id:newMember.id
            })
            
        } catch (err) {
            next(err)
        }
    }

    static async registerPastor(req,res,next){
        try {
            const {name, email , password} = req.body

            const newPastor = await Pastor.create({name , email, password})
            const payload = {
                id: newPastor.id,
                email: newPastor.email

            }
            const token = createToken(payload)

            res.status(201).json({
                access_token: token,
                name: newPastor.name,
                id: newPastor.id

            })
            
        } catch (err) {
            next(err)
        }
    }
    static async login(req,res,next){

        try {
            const { email , password} = req.body
            console.log(email)
            const member = await Member.findOne({where: {
                email : email
            }})
            let pastor;
            let validatePass;
            let payload;
            if(!member){
                pastor = await Pastor.findOne({where: {
                    email : email
                }})
                if(pastor){
                validatePass = comparePassword(password , pastor.password)

                }else{
                    throw ({message:"Invalid email/password"})
                }
                if(validatePass){
                    payload = {
                        id: pastor.id,
                        email: pastor.email
                    }
                    const token = createToken(payload)
                    res.status(200).json(
                        {
                            access_token: token,
                            id:pastor.id,
                            role: 'pastor'
                        }
                        )
                }else{
                    throw ({message:"Invalid email/password"})
                }
            }else{
                validatePass = comparePassword(password , member.password)
                if(validatePass){
                    payload = {
                        id: member.id,
                        email: member.email

                    }

                    const token = createToken(payload)

                    res.status(200).json(
                        {
                            access_token: token,
                            id:member.id,
                            role: 'member'
                        })
                }else{
                    throw ({message:"Invalid email/password"})
                }
            }

        } catch (err) {
            next(err)
        }
    }
}


module.exports = Controller