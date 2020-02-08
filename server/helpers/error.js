const createError = (err) => {
    const temp = []
    err.errors.forEach(error => {
        temp.push(error.message)
    })

    return { message: temp }
}
module.exports = {createError}