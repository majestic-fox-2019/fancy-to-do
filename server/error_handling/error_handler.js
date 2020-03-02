function errorHandler (err, req, res, next) {
  try {
    if(err.status){
      res.status(err.status).json({error: err.message})
    }else if(err.message){
      let errorList = []
      err.errors.forEach(error => {
        errorList.push(error.message)
      });
      res.status(400).json({errors :errorList})
    }
  } catch (error) {
    res.status(500).json({error: 'error from server'})
  }
}


module.exports = errorHandler