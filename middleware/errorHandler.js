const errorHandler = (err,req,res,next) =>{
    switch (err.name) {       
        case 'Email and password is required':
            res.status(401).json(err);
            break;
        case 'Invalid email or password':
            res.status(401).json(err);
            break;
        case 'Insufficient points':
            res.status(401).json(err);
            break;
        case `Can't assign yourself`:
            res.status(401).json(err);
            break;
        case 'Unauthorized':
            res.status(401).json('Token Invalid');
            break;
        case 'JsonWebTokenError': 
        res.status(401).json("Token invalid!")
            break;
        case 'SequelizeValidationError':
            res.status(400).json(err.errors[0].message);
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json('Email is registered!');
            break;
        default:
            res.status(500).json('Internal Server Error')
            break;
    }
}

module.exports = errorHandler