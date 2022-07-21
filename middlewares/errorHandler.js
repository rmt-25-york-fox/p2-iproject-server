const errorHandler = (err, req, res, next) => {
  switch(err.name){
    case 'SequelizeValidationError':
      res.status(400).json({
        statusCode: 400,
        message: err.errors
      });
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({
        statusCode: 400,
        message: err.errors
      });
      break;
    case 'Nomor handphone harus diisi':
      res.status(401).json({
        statusCode: 401,
        message: err.name
      });
      break;
    case 'Unauthorized':
      res.status(401).json({
        statusCode: 401,
        message: 'Token Invalid'
      });
      break;
    case 'JsonWebTokenError':
      res.status(401).json({
        statusCode: 401,
        message: 'Token Invalid'
      });
      break;
    case 'Forbidden':
      res.status(403).json({
        statusCode: 403,
        message: 'You are not authorized',
      });
      break;
    case 'Data tidak ditemukan':
      res.status(404).json({
        statusCode: 404,
        message: err.name
      });
      break;
    case 'Nomor handphone tidak sesuai':
      res.status(404).json({
        statusCode: 404,
        message: err.name
      });
      break;
    default:
      res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
      });
      break;
  }
}

module.exports = errorHandler;