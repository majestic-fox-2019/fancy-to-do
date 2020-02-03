const { User } = require('../models')
const jwt = require('jsonwebtoken')
const comparePassword = require('../helpers/comparePassword')

class UserController {
    static register(req, res, next) {
        User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        .then(createdUser => {
            res.status(201).json(createdUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res, next){
        let payload
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(userData => {
            if(!userData){
                throw ({
                    statusCode: 404,
                    message: 'Invalid Email or Password'
                })
            } else {
                payload = {
                    id: userData.id
                }
                return comparePassword(req.body.password, userData.password)
            }
        })
        .then(compareResult => {
            if(!compareResult){
                throw ({
                    statusCode: 404,
                    message: 'Invalid Email or Password'
                })
            } else {
                require('dotenv').config()
                let token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json(token)
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController