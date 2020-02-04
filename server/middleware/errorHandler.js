"use strict"
module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.status && err.msg) {
        res.status(err.status).json(err.msg)
    } else if (err.status && err.message) {
        res.status(err.status).json(err.message)
    } else if (err.errors[0].validatorKey) {
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