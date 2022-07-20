const errorHandler = async(err,req,res,next)=>{

    let code = 500
    let message = "Internal Server Error"

    if(err.message == "Invalid email/password"){
        code = 401
        message = "Invalid email/password"
    }else if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError'){
        code = 400
        if(err.errors[0].message == "email must be unique"){
            message = "Email has already been registered"
        }else{
        message =  err.errors[0].message
        }
        
    }else if(err.code == 404){
        code = 404
        message = err.message
    }else if(err.name === "JsonWebTokenError"){
        code = 401
        message = 'Token Invalid'
    }
    console.log(err)
    res.status(code).json({message})
}

module.exports = errorHandler