function client(err, req, res, next) {
  if (err.message.length > 0){
    if(err.name === 'SequelizeDatabaseError'){
      next(err)
    }else{
      res.status(err.statusCode || 400).json(err.message)
    }
  }else{
    next(err)
  }
}

function server(err, req, res, next) {
  res.status(500).json(err.message)
}

module.exports = { client, server }