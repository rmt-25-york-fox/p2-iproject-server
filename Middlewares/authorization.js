const { Movie, User, Genre }= require('../models')

let authorizationPastor = async(req ,res , next)=>{
    try {

        if(req.user.role !== "pastor"){
           throw ({message: "Unauthorized Access"})
        }else{
            next()
        }
        
    } catch (err) {
        next(err)
    }
} 

let authorizationMember = async(req ,res , next)=>{
    try {

        if(req.user.role !== "member"){
           throw ({message: "Unauthorized Access"})
        }else{
            next()
        }
        
    } catch (err) {
        next(err)
    }
} 


module.exports = {authorizationPastor , authorizationMember}