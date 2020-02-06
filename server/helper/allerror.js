function allerror(err) {
  
  // let obj = {}

  // for (let i = 0; i < err.length; i++) {
  //     obj[err[i].path]=err[i].message
  // }

  // return obj
  const temp = []
  err.errors.forEach(error => {
      temp.push(error.message)
  })

  return { message: temp }
}

module.exports = allerror