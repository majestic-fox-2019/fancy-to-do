function errorHandler(err, req, res, next) {
    if (err.code) {
        res.status(err.code).json({ err, msg: err.message })
    } else if (err.errors) {
        let errMsg = []
        err.errors.forEach(el => {
            errMsg.push(el.message)
        });
        res.status(400).json({ errMsg })
    } else {
        console.log(err)
        res.status(500).json({ err, msg: "internal server error" })
    }
}

module.exports = errorHandler