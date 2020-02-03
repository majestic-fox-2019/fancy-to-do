function allerror(err) {
  
  let obj = {}

  for (let i = 0; i < err.length; i++) {
      obj[err[i].path]=err[i].message
  }

  return obj
}

module.exports = allerror