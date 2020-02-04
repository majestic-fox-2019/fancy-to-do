"use strict"
module.exports = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).json(err.msg)
    } else if (err.errors[0].validatorKey === "is_null") {
        const arr = []
        err.errors.forEach(err => {
            arr.push({
                status: 400,
                msg: err.message
            })
        });
        res.status(400).json(arr)
    } else if (err.errors[0].validatorKey === "notEmpty") {
        const arr = []
        err.errors.forEach(err => {
            arr.push({
                status: 400,
                msg: err.message
            })
        });
        res.status(400).json(arr)
    }
}