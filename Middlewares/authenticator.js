const {Member, Pastor} = require('../models')
const {verifyToken} = require('../Helpers/jwtHelper')

const authentication = async (req, res, next) =>{
    try {
        const {access_token} = req.headers
        const decoded = verifyToken(access_token)
        console.log(decoded)
        let options = {
            where:{
                email : decoded.email
            }
        }

        let foundMember = await Member.findOne(options)
        let foundPastor
        if(!foundMember){
            foundPastor = await Pastor.findOne(options)
            if(foundPastor){
                req.user = {
                    id: decoded.id,
                    role: "pastor"
                }
            next()
            }else{
                throw({message: "Please re-login"})
            }
        }else if(foundMember){
             req.user = {
                id: decoded.id,
                role: "member"
             }
             next()
            }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication