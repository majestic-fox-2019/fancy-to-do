const express = require('express')
const app = express()

class FindError {
    static showError (err, req, res, next){
        try {
            if (err.statusCode) {
                res.status(404).json(err.msg)
            }
            else if (err.errors){
                let arrErrors = []
                err.errors.forEach(errors=>{
                    arrErrors.push(errors.message)
                })
                res.status(400).json(arrErrors)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = FindError