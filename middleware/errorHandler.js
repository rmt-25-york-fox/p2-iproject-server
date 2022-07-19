const errorHandler = (err,req,res,next) =>{
    switch (err.name) {       
        case 'Email and password is required':
            res.status(401).json({statusCode: 401,message: 'Email and password is required'});
            break;
        case 'Invalid email or password':
            res.status(401).json({statusCode: 401,message: err});
            break;
        case 'Unauthorized':
            res.status(401).json({statusCode: 401,message: 'Token Invalid'});
            break;
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