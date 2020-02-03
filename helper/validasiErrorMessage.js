function errorMessage(error){
  let objError = {}
  error.map(el => {
    objError[el.path] = el.message
  })
  return objError
}

module.exports = errorMessage