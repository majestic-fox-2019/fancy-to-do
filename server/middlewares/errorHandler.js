exports.client = function(err, req, res, next){
  try{
    let newError = new Error
    switch(err.name){
      case 'SequelizeDatabaseError':
        next(err)
        break
      case 'SequelizeConnectionError':
        next(err)
        break
      case 'SequelizeValidationError':
        newError.statusCode = 400
        newError.message = {}
        err.errors.map(el => {
          newError.message[el.path] = el.message
        })
        throw newError
      case 'JsonWebTokenError':
        newError.statusCode = 402
        newError.message = {
          message : err.message
        }
        throw newError
      default:
        newError.statusCode = err.statusCode
        newError.message = {
          message : err.message
        }
        throw newError
    }
  }
  catch(err){
    res.status(err.statusCode || 404).json(err.message || err)
  }
}

exports.server = function(err, req, res, next){
  res.status(500).json({
    message: 'Error Not Found'
  })
}