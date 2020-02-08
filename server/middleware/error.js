module.exports = function (err, req, res, next) {
  try {
    let error = new Error
    console.log(error, '< error validation')
    switch (err.name) {
      case 'SequelizeValidationError':
        error.statusCode = 400
        error.message = {}
        err.errors.forEach(element => {
          error.message[element.path] = element.message
        })
        throw error
        break

      default:
        throw error
        break
      // case 'SequelizeDatabaseError':


    }
  }
  catch (err) {
    console.log(err, '< catch error')
    res.status(err.statusCode || 500).json(err.message || err)
  }


  // if (err.status) {
  //   res.status(err.status).json({
  //     message: err.message
  //   })
  // } else {
  //   console.log(err, '< ini error di error')
  //   res.status(500).send('Something broke!')
  // }
}