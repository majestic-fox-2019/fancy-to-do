"use strict"
module.exports = (err, req, res, next) => {
    if (err.status == 404) {
        res.status(404).json("data not found")
    }
}