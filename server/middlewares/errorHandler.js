"use strict"
module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.status && err.msg) {
        res.status(err.status).json(err.msg)
    } else if (err.status && err.message) {
        res.status(err.status).json(err.message)
    } else if (err.name === "JsonWebTokenError") {
        res.status(401).json("Unauthorized Invalid Token")
    } else if (err.name === "CastError") {
        res.status(404).json("Data Not Found")
    } else if (err.name === "SequelizeValidationError") {
        const arr = []
        err.errors.forEach(err => {
            arr.push({
                status: 400,
                msg: err.message
            })
        });
        res.status(400).json(arr)
    }  else {
        res.status(500).json("Internal Server Error")
    }
}