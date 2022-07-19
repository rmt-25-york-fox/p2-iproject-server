const errorHandler = (err,req,res,next) =>{
    switch (err.name) {       
        case 'SequelizeValidationError':
            res.status(400).json({statusCode: 400,message: err.errors[0].message});
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({statusCode: 400,message: 'Email is registered!'});
            break;
        default:
            res.status(500).json({message: 'ISE'})
            break;
    }
}

module.exports = errorHandler