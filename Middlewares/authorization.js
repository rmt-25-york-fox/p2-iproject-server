const { Movie, User, Genre }= require('../models')

let authorization = async(req ,res , next)=>{
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


module.exports = authorization