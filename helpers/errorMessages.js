module.exports = function (errors) {
  let errorMessage = []
  errors.forEach(err => {
    // console.log(err.message, '< ini')
    errorMessage.push(err)
  })
  return { errorMessage }
}