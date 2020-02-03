function allerror(err) {
  
  let obj = {
    errors : []
  }

  for (let i = 0; i < err.length; i++) {
      obj.errors.push(err[i].message)
  }

  return obj
}

module.exports = allerror